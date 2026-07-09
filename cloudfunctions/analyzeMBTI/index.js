const cloud = require('wx-server-sdk');
const https = require('https');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const TYPE_NAMES = [
  'INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP',
  'ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'
];

const systemPrompt = `你是一个专业的MBTI人格分析师。根据用户在多个场景对话中的回复，分析其MBTI类型。

分析时请关注以下语言和行为线索：

【E/I 外向/内向】
- 偏E线索：回应热情饱满、主动延展话题、提到社交活动时态度积极、享受群体氛围、出现"热闹""大家一起""认识新朋友""开心"等表达
- 偏I线索：回应简洁克制、表达对独处的需要和正面感受、出现"安静""一个人待着""有点累/消耗""社恐"等表达、对大型社交流露回避或疲惫
- 关键判断依据：用户如何描述自己的社交体验和能量来源，而非对话中表现得是否健谈

【S/N 感觉/直觉】
- 偏S线索：回答具体务实、关注实际细节和感官体验（味道好不好、画面美不美、声音怎么样）、用亲身经历举例、倾向可操作的方案
- 偏N线索：喜欢抽象和假设性话题、用比喻和联想、关注意义和可能性多于具体事实、跳出问题本身进行发散
- 关键判断依据：用户思考问题时是从具体到具体（S），还是从具体跳到抽象（N）

【T/F 思考/情感】
- 偏T线索：分析利弊得失、逻辑链条清晰、态度客观抽离、出现"因为""合理""效率""公平"等词、情感类词汇少
- 偏F线索：关注人的感受和关系和谐、有明显的共情表达、出现"感觉""在乎""开心/难过/不舒服"等词、决策时主动考虑对他人的影响
- 关键判断依据：用户做判断时的第一反应是"对不对"（T）还是"好不好/舒不舒服"（F）

【J/P 判断/感知】
- 偏J线索：喜欢计划和确定性、表达对秩序和条理的偏好、出现"应该""必须""计划好了""提前"等词、对失控感到不适
- 偏P线索：灵活应变、对变化和不确定性开放、出现"随便""到时候再说""看情况""顺其自然"等表达、享受即兴和自由
- 关键判断依据：用户面对未知时的态度——是想提前掌控（J）还是保持弹性（P）

分析原则：
1. 优先参考用户的原话——用户具体说了什么比任何预设都重要
2. 某个维度的线索不足（用户在该话题上回答很简短或回避）时，该维度分数接近50/50，不要强行判断
3. 区分"用户性格"和"话题引导"——不要因为话题是露营就默认用户喜欢户外/社交
4. 综合所有场景整体判断，不要被单一场景过度影响
5. confidence 表示你对自己分析结果的把握程度（0-1之间）。如果四个维度都有清晰线索，confidence>0.8；如果多数维度线索模糊，confidence<0.6

返回纯JSON（不要markdown代码块）：
{"type":"INTJ","scores":{"E":40,"I":60,"S":35,"N":65,"T":70,"F":30,"J":55,"P":45},"confidence":0.82}`;

// ── API Config (env vars with fallback) ──
const ENV_ID = process.env.HUNYUAN_ENV_ID || '';
const API_KEY = process.env.HUNYUAN_API_KEY || '';
const MODELS = ['hy3-preview', 'hunyuan-turbo', 'hunyuan-lite'];

async function callHunyuanAnalyze(messages) {
  if (!ENV_ID || !API_KEY) {
    throw new Error('missing HUNYUAN_ENV_ID or HUNYUAN_API_KEY');
  }
  for (const model of MODELS) {
    console.log('[analyzeMBTI] trying model:', model);
    try {
      const text = await tryModel(messages, model);
      return text;
    } catch (e) {
      console.log('[analyzeMBTI] model', model, 'failed:', e.message, '→ trying next');
    }
  }
  throw new Error('All models exhausted');
}

function tryModel(messages, model) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ model, messages });
    const req = https.request({
      hostname: `${ENV_ID}.api.tcloudbasegateway.com`,
      path: '/v1/ai/hunyuan-v3/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${API_KEY}`,
        'Connection': 'close'
      },
      timeout: 15000
    }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode === 200 && parsed.choices) {
            let text = parsed.choices[0].message.content.trim();
            text = text.replace(/<think[^>]*>[\s\S]*?<\/think>/g, '').trim();
            resolve(text);
          } else {
            reject(new Error(parsed.error?.message || `HTTP ${res.statusCode}`));
          }
        } catch (e) {
          reject(new Error('parse: ' + body.slice(0, 200)));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.write(data);
    req.end();
  });
}

exports.main = async (event) => {
  const openId = event.userInfo?.openId || '';

  // Verify caller origin
  if (!openId) return { ok: false, error: 'unauthorized' };

  // Rate limit: one analysis per 10 seconds per user
  try {
    const db = cloud.database();
    const now = Date.now();
    const cutoff = now - 10000;
    const rateRes = await db.collection('analyze_limit').where({ _openid: openId, lastCallAt: db.command.gt(cutoff) }).get();
    if (rateRes.data.length > 0) return { ok: false, error: 'too_frequent' };
    const updateRes = await db.collection('analyze_limit').where({ _openid: openId }).update({ data: { lastCallAt: now } });
    if (updateRes.stats.updated === 0) {
      await db.collection('analyze_limit').add({ data: { _openid: openId, lastCallAt: now } });
    }
  } catch (e) {
    console.error('[analyzeMBTI] rate limit db error:', e.message);
    return { ok: false, error: 'internal_error' };
  }

  const transcript = (event.transcript || '').slice(0, 8000);
  if (!transcript || transcript.length < 50) return { ok: false, error: 'transcript too short' };

  try {
    const content = await callHunyuanAnalyze([
      { role: "system", content: systemPrompt },
      { role: "user", content: `用户对话记录：\n${transcript}` }
    ]);

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('invalid format');
    const data = JSON.parse(jsonMatch[0]);

    if (!TYPE_NAMES.includes(data.type)) {
      throw new Error('invalid type: ' + data.type);
    }

    return { ok: true, type: data.type, scores: data.scores, confidence: data.confidence ?? 0.5 };
  } catch (err) {
    console.error('AI分析失败');
    return { ok: false, error: 'analysis failed' };
  }
};
