const ALL_QUESTIONS = [
  // === E/I 维度 (25题) ===
  { q: "周末休息时，你通常更想做？", a: "约朋友出去玩或参加聚会", b: "看心情，两者都可以", c: "一个人待着做自己的事", dim: "EI" },
  { q: "在工作中，你更倾向于？", a: "和同事一起讨论协作", b: "视任务情况而定", c: "独立完成自己的部分", dim: "EI" },
  { q: "你的手机里联系人多吗？", a: "很多，经常和不同的人联系", b: "数量一般，保持基本联系", c: "不多，只和最亲近的人联系", dim: "EI" },
  { q: "参加聚会时你通常是？", a: "活跃气氛、主动和陌生人聊天", b: "跟熟悉的人待在一起", c: "安静地待在角落，希望早点结束", dim: "EI" },
  { q: "你感觉疲惫时，更有效的恢复方式是？", a: "找朋友聊天或出去逛逛", b: "都可以，看情况", c: "一个人安静地休息", dim: "EI" },
  { q: "在团队中你更倾向于扮演什么角色？", a: "发言者，积极表达观点", b: "看情况参与", c: "倾听者，想好了再说", dim: "EI" },
  { q: "你更喜欢哪种沟通方式？", a: "面对面交流", b: "都可以", c: "文字消息或邮件", dim: "EI" },
  { q: "在社交场合中你给人的第一印象是？", a: "热情、容易接近", b: "正常、不冷不热", c: "安静、有点距离感", dim: "EI" },
  { q: "你需要做决定时，更倾向于？", a: "和别人讨论，听听大家的意见", b: "参考他人意见但自己决定", c: "自己独立思考再做决定", dim: "EI" },
  { q: "你在公共场合发言时感觉？", a: "很自然，甚至享受", b: "不排斥但也不会主动", c: "有些紧张，能避免就避免", dim: "EI" },
  { q: "你更喜欢在大公司还是小团队工作？", a: "大公司，人多热闹有氛围", b: "都好，各有优势", c: "小团队，人少清净效率高", dim: "EI" },
  { q: "朋友约你临时出门，你的第一反应是？", a: "好啊，马上出发！", b: "看具体是什么活动", c: "有点突然，想拒绝", dim: "EI" },
  { q: "你在人多的地方感觉如何？", a: "很兴奋，充满能量", b: "还可以，能适应", c: "有些消耗，想快点离开", dim: "EI" },
  { q: "你更享受哪种假期？", a: "和朋友们一起出去旅行", b: "和少数人一起", c: "独自旅行或宅在家", dim: "EI" },
  { q: "你在社交软件上更常做的是？", a: "频繁更新动态、互动", b: "偶尔看看和更新", c: "基本不更新，只看不发", dim: "EI" },
  { q: "当你想弄清楚一个问题时，你更倾向于？", a: "找懂的人聊聊", b: "查资料为主，偶尔问人", c: "自己查资料研究", dim: "EI" },
  { q: "你周围的朋友数量通常是？", a: "很多，有广泛的社交圈", b: "有一些要好的朋友", c: "很少但很深入", dim: "EI" },
  { q: "在咖啡厅或图书馆，你喜欢坐在？", a: "中间位置，周围有人", b: "无所谓", c: "角落或靠窗的安静位置", dim: "EI" },
  { q: "你对陌生人搭话的态度是？", a: "很乐意聊几句", b: "看对方说什么", c: "尽量礼貌地结束对话", dim: "EI" },
  { q: "你参加不熟悉的社交活动时会？", a: "主动认识新朋友", b: "适当地参与", c: "跟着认识的人不离开", dim: "EI" },
  { q: "一天之中你更喜欢哪个时段？", a: "白天，可以和人互动", b: "无所谓", c: "夜晚，安静没人打扰", dim: "EI" },
  { q: "你觉得自己更偏向？", a: "话比较多的人", b: "看情况", c: "话比较少的人", dim: "EI" },
  { q: "和一群人走散了你会？", a: "主动打电话联系大家", b: "等一下看看情况", c: "自己按原路返回", dim: "EI" },
  { q: "你获取能量的主要来源是？", a: "和人交往、参加活动", b: "两者都有", c: "独处、阅读或思考", dim: "EI" },
  { q: "总体来说，你觉得自己是？", a: "外向的人", b: "中等，不算外向也不算内向", c: "内向的人", dim: "EI" },

  // === S/N 维度 (25题) ===
  { q: "你更关注事物的哪方面？", a: "具体细节和实际用途", b: "两者都关注", c: "背后的意义和可能性", dim: "SN" },
  { q: "读一本书或看一部电影时，你更在意？", a: "情节和具体内容", b: "两者都关注", c: "主题思想和隐喻", dim: "SN" },
  { q: "当你学习新东西时，你更喜欢？", a: "一步步按教程来", b: "视情况而定", c: "先理解整体概念再动手", dim: "SN" },
  { q: "你更容易记住什么？", a: "发生过的事实和细节", b: "两者差不多", c: "感受和整体印象", dim: "SN" },
  { q: "朋友跟你讲一件趣事，你更关注？", a: "具体发生了什么", b: "都关注", c: "这件事说明了什么", dim: "SN" },
  { q: "你做决定时更依赖？", a: "过往经验和实际数据", b: "两者结合", c: "直觉和预感", dim: "SN" },
  { q: "你更擅长做什么？", a: "注意到环境的细微变化", b: "两者都可以", c: "联想事物之间的深层联系", dim: "SN" },
  { q: "你更喜欢讨论什么样的话题？", a: "具体、实际、当下的事", b: "都可以", c: "抽象、理论、未来的事", dim: "SN" },
  { q: "让你画一幅画，你会更注重？", a: "画得像不像、细节是否到位", b: "两者兼有", c: "画面的意境和想表达的感觉", dim: "SN" },
  { q: "你使用新产品时会？", a: "先看说明书了解功能", b: "简单看看就上手", c: "直接摸索，按感觉操作", dim: "SN" },
  { q: "你对下面哪种说法更有共鸣？", a: "脚踏实地，一步一个脚印", b: "两者都有道理", c: "仰望星空，探索无限可能", dim: "SN" },
  { q: "你在旅行前更常做的是？", a: "详细规划路线和住宿", b: "简单规划一下", c: "到了再说，随性而行", dim: "SN" },
  { q: "你更喜欢哪种类型的朋友？", a: "务实可靠、说到做到", b: "都挺好", c: "天马行空、有趣有想法", dim: "SN" },
  { q: "当你听一首歌时你更在意？", a: "旋律、歌词具体写什么", b: "都关注", c: "这首歌带来的氛围和感觉", dim: "SN" },
  { q: "你更善于观察什么？", a: "眼前的具体事物", b: "两者差不多", c: "事情背后的模式", dim: "SN" },
  { q: "你更相信什么？", a: "亲眼所见的事实", b: "两者都信一些", c: "内心的感觉和直觉", dim: "SN" },
  { q: "烹饪时你更倾向于？", a: "严格按照食谱做", b: "参考食谱但自由发挥", c: "随意搭配，凭感觉做", dim: "SN" },
  { q: "你在描述一件事时更侧重？", a: "准确还原具体经过", b: "两者结合", c: "表达自己的感受和看法", dim: "SN" },
  { q: "你对科幻或奇幻题材的感觉是？", a: "不太感兴趣，太脱离现实", b: "偶尔看看", c: "很喜欢，充满想象力", dim: "SN" },
  { q: "布置房间时你更看重？", a: "实用性和功能性", b: "两者兼顾", c: "风格和氛围感", dim: "SN" },
  { q: "你更喜欢哪种表达方式？", a: "直接明了、说到点子上", b: "两者都可以", c: "生动形象、会用比喻", dim: "SN" },
  { q: "你解决问题时通常？", a: "用已经验证过的方法", b: "视情况选择", c: "尝试全新的方法", dim: "SN" },
  { q: "你看一部电影更可能？", a: "一次看完，关注剧情细节", b: "正常看完", c: "边看边联想到其他事物", dim: "SN" },
  { q: "你更喜欢哪种游戏？", a: "模拟类、策略类（如模拟城市）", b: "各类都玩", c: "角色扮演、开放世界（如塞尔达）", dim: "SN" },
  { q: "总的来说，你认为自己更偏向？", a: "务实派，注重实际", b: "介于两者之间", c: "理想派，注重想象", dim: "SN" },

  // === T/F 维度 (25题) ===
  { q: "做重要决定时你更看重？", a: "逻辑和客观事实", b: "两者都会考虑", c: "对人的影响和感受", dim: "TF" },
  { q: "朋友找你倾诉烦恼，你通常会？", a: "帮他分析问题出在哪", b: "两者兼有", c: "先安慰他的情绪", dim: "TF" },
  { q: "你更在意别人的评价是？", a: "你做事靠不靠谱", b: "都挺在意", c: "你温不温柔、好不好相处", dim: "TF" },
  { q: "和人发生分歧时你更在意？", a: "把道理说清楚，对错要分明", b: "视情况而定", c: "别伤了和气", dim: "TF" },
  { q: "你更欣赏什么样的人？", a: "有能力、有原则的人", b: "都欣赏", c: "善良、有同理心的人", dim: "TF" },
  { q: "看到社会新闻时你第一反应是？", a: "分析背后的原因和逻辑", b: "两者都有", c: "感到难过或愤怒", dim: "TF" },
  { q: "你觉得什么样的建议更有价值？", a: "客观中肯、不带偏见的", b: "都好", c: "温暖贴心、顾及感受的", dim: "TF" },
  { q: "评价一个人的工作时你更看重？", a: "结果和效率", b: "两者都看", c: "努力和态度", dim: "TF" },
  { q: "你更常被认为是？", a: "理性冷静的人", b: "适中", c: "感性温暖的人", dim: "TF" },
  { q: "你做决策的速度通常是？", a: "快速决定，分析清楚就行动", b: "适中", c: "犹豫不决，要考虑大家感受", dim: "TF" },
  { q: "你和朋友约好见面对方迟到很久，你会？", a: "直接表达不满，问原因", b: "适当提醒", c: "算了，他肯定有事", dim: "TF" },
  { q: "你更在乎什么？", a: "事情做得公不公平", b: "都重要", c: "大家开不开心", dim: "TF" },
  { q: "看到有人被欺负时，你更可能？", a: "分析事情经过再决定怎么做", b: "两者都有", c: "立刻上前制止或帮忙", dim: "TF" },
  { q: "你更喜欢哪种领导风格？", a: "公正严明、赏罚分明", b: "都可以", c: "关怀下属、有人情味", dim: "TF" },
  { q: "当你和别人吵架后，你更在意的是？", a: "道理上到底谁对谁错", b: "都有一点", c: "对方是不是伤心了", dim: "TF" },
  { q: "你更擅长做什么事？", a: "冷静分析复杂问题", b: "都可以", c: "体谅和照顾他人情绪", dim: "TF" },
  { q: "你如何看待规则？", a: "规则就是规则，应该遵守", b: "视情况而定", c: "规则是死的，人是活的", dim: "TF" },
  { q: "你更倾向于如何安慰人？", a: "帮他想解决办法", b: "两者结合", c: "陪着他、倾听他", dim: "TF" },
  { q: "你觉得公平和同情哪个更重要？", a: "公平", b: "都重要", c: "同情", dim: "TF" },
  { q: "你在团队讨论中更常扮演？", a: "提出不同意见、挑逻辑漏洞的人", b: "适中", c: "调和气氛、照顾大家情绪的人", dim: "TF" },
  { q: "你选择职业时更看重？", a: "薪资和发展前景", b: "都看重", c: "工作氛围和团队关系", dim: "TF" },
  { q: "你更希望别人怎么评价你？", a: "这个人很明事理", b: "都可以", c: "这个人很温暖", dim: "TF" },
  { q: "面对需要裁员的局面，你会？", a: "根据业绩和贡献决定", b: "两者结合", c: "尽量不裁，想其他办法", dim: "TF" },
  { q: "你更习惯用哪种方式帮助别人？", a: "给他资源和建议", b: "都可以", c: "给他陪伴和情感支持", dim: "TF" },
  { q: "总的来说，你觉得自己做决策时更偏向？", a: "理性分析 > 感性考量", b: "两者差不多", c: "感性考量 > 理性分析", dim: "TF" },

  // === J/P 维度 (25题) ===
  { q: "你平时更习惯哪种生活节奏？", a: "有计划、有安排", b: "看情况", c: "随性自由、灵活机动", dim: "JP" },
  { q: "你的房间或办工作通常？", a: "整洁有序，每样东西有固定位置", b: "还算整齐", c: "有点乱但自己找得到东西", dim: "JP" },
  { q: "你更喜欢什么样的工作方式？", a: "先定好计划再执行", b: "两者都可", c: "边做边调整", dim: "JP" },
  { q: "你对待截止日期的态度是？", a: "提前完成，留出余量", b: "按时完成", c: "压线完成甚至偶尔逾期", dim: "JP" },
  { q: "你出门旅行时更倾向于？", a: "详细规划好每天的行程", b: "规划大方向", c: "不规划，到了再说", dim: "JP" },
  { q: "面对多个选择时你通常会？", a: "尽快做出决定", b: "适当比较后再决定", c: "保持开放，迟迟定不下来", dim: "JP" },
  { q: "你更享受哪种状态？", a: "一切尽在掌控中", b: "都可以", c: "随遇而安、顺其自然", dim: "JP" },
  { q: "你平时有列清单的习惯吗？", a: "经常列清单", b: "偶尔列", c: "从来不列", dim: "JP" },
  { q: "计划被打乱时你的感觉是？", a: "很不舒服，想尽快恢复秩序", b: "有点困扰但能接受", c: "没关系，顺势调整", dim: "JP" },
  { q: "你更喜欢哪种性格的人？", a: "靠谱、守时、说一不二", b: "都可以", c: "随性、好说话、灵活变通", dim: "JP" },
  { q: "你平时的消费习惯是？", a: "提前做预算，按计划消费", b: "大致有数", c: "随心所欲，想买就买", dim: "JP" },
  { q: "你更擅长时间管理吗？", a: "是的，我很善于安排时间", b: "一般水平", c: "不太擅长，经常拖延", dim: "JP" },
  { q: "你更喜欢什么样的环境？", a: "规矩明确、秩序井然", b: "都可以", c: "自由宽松、不受约束", dim: "JP" },
  { q: "你做事的风格是怎样的？", a: "做完一件再做下一件", b: "视情况而定", c: "多件事情同时进行", dim: "JP" },
  { q: "你更喜欢哪种安排？", a: "提前约好、确定时间和地点", b: "都可以", c: "临时起意、说走就走", dim: "JP" },
  { q: "你觉得自己更偏向哪种人？", a: "自律的人", b: "中间状态", c: "自由散漫的人", dim: "JP" },
  { q: "你对不确定性的态度是？", a: "不太喜欢，希望事情是确定的", b: "能接受", c: "享受不确定性带来的惊喜", dim: "JP" },
  { q: "你更喜欢哪类游戏或运动？", a: "有明确规则和目标的", b: "都可以", c: "自由发挥、创造性的", dim: "JP" },
  { q: "你每天起床的方式通常是？", a: "闹钟一响就起", b: "赖一会儿再起", c: "闹钟响几次才起", dim: "JP" },
  { q: "你的手机 app 布局是？", a: "分类整理、整整齐齐", b: "还算有序", c: "随便放，用完找", dim: "JP" },
  { q: "你更习惯哪种学习方式？", a: "制定学习计划按部就班", b: "有大致方向", c: "想学什么就学什么", dim: "JP" },
  { q: "你一般怎么度过一天休息日？", a: "提前想好要做什么", b: "有个大概想法", c: "睡到自然醒，随性安排", dim: "JP" },
  { q: "你对做决定这件事的看法是？", a: "决定了就踏实了", b: "都可以", c: "不想太早被决定束缚", dim: "JP" },
  { q: "你更赞同哪句话？", a: "凡事预则立，不预则废", b: "都有道理", c: "计划赶不上变化", dim: "JP" },
  { q: "总的来说，你觉得自己是？", a: "有条理有计划的人", b: "中间状态", c: "灵活随性的人", dim: "JP" }
];

const { TYPE_NAMES, TYPE_DESCS, FULL_REPORTS, DIM_MAP } = require('../../data/mbti-types');

Page({
  data: {
    questions: [],
    selected: [],
    current: 0,
    showResult: false,
    pct: 0,
    allAnswered: false,
    answeredCount: 0,
    btnText: '下一题 →',
    showError: false,
    resultType: '',
    resultName: '',
    resultDesc: '',
    impression: '',
    report: '',
    pE: 0, pI: 0, pS: 0, pN: 0, pT: 0, pF: 0, pJ: 0, pP: 0
  },
  onLoad() {
    this.initQuiz();
  },
  initQuiz() {
    this._completed = false;
    const byDim = { EI: [], SN: [], TF: [], JP: [] };
    ALL_QUESTIONS.forEach(q => byDim[q.dim].push(q));
    let selected = [];
    ['EI', 'SN', 'TF', 'JP'].forEach(dim => {
      const pool = this.shuffle([...byDim[dim]]);
      selected = selected.concat(pool.slice(0, 10));
    });
    selected = this.shuffle(selected);
    const selArr = selected.map(() => -1);
    this.setData({
      questions: selected,
      selected: selArr,
      current: 0,
      showResult: false,
      pct: 0,
      allAnswered: false,
      answeredCount: 0,
      showError: false,
      btnText: '下一题 →'
    });
  },
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },
  select(e) {
    const opt = parseInt(e.currentTarget.dataset.opt);
    const cur = this.data.current;
    const newSelected = this.data.selected.concat();
    newSelected[cur] = opt;
    let cnt = 0;
    for (let k = 0; k < 40; k++) { if (newSelected[k] >= 0) cnt++; }
    const update = { selected: newSelected, answeredCount: cnt, pct: Math.round(cnt / 40 * 100), showError: false };
    if (cur === 39) { update.allAnswered = true; update.btnText = '查看结果 ✓'; }
    this.setData(update);
  },
  nextQ() {
    if (this.data.selected[this.data.current] === -1) {
      this.setData({ showError: true });
      return;
    }
    if (this.data.current === 39) {
      if (this.data.allAnswered) this.handleComplete();
      return;
    }
    if (this.data.current < 39) {
      const next = this.data.current + 1;
      this.setData({ current: next, pct: Math.round(next / 40 * 100), showError: false });
    }
  },
  prevQ() {
    if (this.data.current > 0) {
      const prev = this.data.current - 1;
      this.setData({ current: prev, pct: Math.round(prev / 40 * 100) });
    }
  },
  handleComplete() {
    if (this._completed) return;
    this._completed = true;
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    const { questions, selected } = this.data;
    questions.forEach((q, idx) => {
      const ans = selected[idx];
      if (ans === -1) return;
      const [left, right] = DIM_MAP[q.dim];
      if (ans === 0) { scores[left] += 2; }
      else if (ans === 1) { scores[left] += 1; scores[right] += 1; }
      else if (ans === 2) { scores[right] += 2; }
    });

    // Type determination: ties go to I, N, F, P
    const borderline = {
      EI: scores.E === scores.I,
      SN: scores.S === scores.N,
      TF: scores.T === scores.F,
      JP: scores.J === scores.P
    };

    const type =
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.S > scores.N ? 'S' : 'N') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P');

    const calcPct = (score) => Math.round(score / 20 * 100);

    const report = FULL_REPORTS[type] || {};

    const resultData = {
      resultType: type,
      resultName: TYPE_NAMES[type] || '未知',
      resultDesc: TYPE_DESCS[type] || '',
      impression: report.impression || '',
      report: (report.traits || '') + '\n\n' + (report.social || ''),
      growth: report.growth || '',
      pE: calcPct(scores.E), pI: calcPct(scores.I),
      pS: calcPct(scores.S), pN: calcPct(scores.N),
      pT: calcPct(scores.T), pF: calcPct(scores.F),
      pJ: calcPct(scores.J), pP: calcPct(scores.P),
      borderlineEI: borderline.EI, borderlineSN: borderline.SN,
      borderlineTF: borderline.TF, borderlineJP: borderline.JP
    };

    getApp().globalData.currentResult = resultData;

    // Store scores for deferred save (only after ad is watched)
    this._pendingScores = scores;
    this._pendingCalcPct = calcPct;

    this.setData({
      showResult: true,
      pct: 100,
      resultType: resultData.resultType,
      resultName: resultData.resultName,
      resultDesc: resultData.resultDesc,
      impression: resultData.impression,
      pE: resultData.pE, pI: resultData.pI,
      pS: resultData.pS, pN: resultData.pN,
      pT: resultData.pT, pF: resultData.pF,
      pJ: resultData.pJ, pP: resultData.pP,
      borderlineEI: resultData.borderlineEI, borderlineSN: resultData.borderlineSN,
      borderlineTF: resultData.borderlineTF, borderlineJP: resultData.borderlineJP
    });

    // Navigate to result after a brief delay
    setTimeout(() => { this.goToResult(); }, 500);
  },
  goToResult() {
    const app = getApp();
    const type = this.data.resultType;
    const calcPct = this._pendingCalcPct;
    const scores = this._pendingScores;
    if (!type || !calcPct || !scores) {
      wx.showToast({ title: '结果生成中，请稍候', icon: 'none' });
      return;
    }
    const historyEntry = {
      type: type,
      name: this.data.resultName,
      dims: [
        Math.max(calcPct(scores.I), calcPct(scores.E)),
        Math.max(calcPct(scores.N), calcPct(scores.S)),
        Math.max(calcPct(scores.F), calcPct(scores.T)),
        Math.max(calcPct(scores.J), calcPct(scores.P))
      ],
      date: new Date().toLocaleDateString('zh-CN'),
      source: '传统选项'
    };
    app.globalData.testHistory.unshift(historyEntry);
    wx.setStorageSync('testHistory', app.globalData.testHistory);
    app.syncTestHistoryToCloud(historyEntry).then(id => {
      if (!id) return;
      historyEntry._id = id;
      wx.setStorageSync('testHistory', app.globalData.testHistory);
    });
    wx.navigateTo({ url: '/pages/result/result' });
  },
  restart() {
    this.initQuiz();
  },
  goBack() {
    wx.navigateBack();
  }
});
