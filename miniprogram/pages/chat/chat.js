const SCENES = [
  {
    dim: 'EI',
    name: '露营邀约',
    context: '周末户外露营活动邀约，讨论准备工作和露营偏好',
    opening: '这周末我打算组织一个露营去郊区山上看星星 🌟 有几个朋友会去，你要不要一起？',
    followUps: [
      '太好了！那你觉得我们带些什么吃的比较好？我带烧烤架 🍖',
      '说到烧烤，你喜欢吃什么肉？羊肉串还是五花肉？🥩',
      '对了，山里晚上可能会降温到十几度，你记得带个薄外套哦 🧥',
      '那露营的时候你喜欢一群人围着篝火聊天，还是一个人静静地看星星？🔥',
      '好嘞！那我们周六早上8点出发，记得带帐篷和防蚊水哈 ⛺'
    ],
    closing: '好啦，露营的事就这么定了！感觉你这人挺靠谱的，周六早上见，别忘了带外套～ ⛺'
  },
  {
    dim: 'TF',
    name: '职场困境',
    context: '职场压力和人际关系处理，探讨工作态度和处事原则',
    opening: '唉，今天工作上遇到一个事想听听你的看法。我领导给我安排了一个很难的项目，时间特别紧，你觉得我应该接吗？',
    followUps: [
      '你说得对，我其实也是这么想的。那如果接了之后发现做不完呢？',
      '嗯嗯，我也在考虑要不要去谈谈。那如果是你，你会怎么跟领导说？',
      '有道理。那如果同事总是把活儿推给你，你会怎么处理这种情况？',
      '确实。那你觉得工作中有必要跟同事成为朋友吗？🤝',
      '好的，受教了。最后一个——你觉得什么样的人适合当管理者？'
    ],
    closing: '谢谢你陪我聊这些，你的建议很实在。感觉你对职场有一套自己的原则，挺有启发的 👍'
  },
  {
    dim: 'TF',
    name: '道德选择',
    context: '道德困境和价值观探讨，了解对方的道德底线和决策方式',
    opening: '跟你聊个有意思的——假如你在路上捡到一个钱包，里面有好多现金但是没有身份证，你会怎么办？',
    followUps: [
      '我也是这么想的！但如果是你特别需要这笔钱的时候呢？',
      '你这个做法很靠谱！那如果要花很多时间去找失主，你还会这么做吗？',
      '明白了。换个角度——如果你看到朋友在考试作弊，你会揭发吗？',
      '说得有道理。那如果是陌生人遇到危险需要你挺身而出，你会毫不犹豫帮忙吗？',
      '最后一个——你认为做好事应该不留名，还是应该被奖励和认可？🏆'
    ],
    closing: '有意思的讨论！从这些选择里我能感受到你的价值观。跟你聊天让我也思考了不少东西 🤔'
  },
  {
    dim: 'SN',
    name: '旅行冒险',
    context: '旅行偏好和冒险精神，了解对方对自由、计划和新事物的态度',
    opening: '我最近在计划一次背包旅行去云南大理，走茶马古道那种路线 🎒 如果是你，更喜欢跟团还是自由行？',
    followUps: [
      '有见地！那如果旅行途中计划被打乱了，比如航班取消，你会崩溃还是顺其自然？✈️',
      '哈哈我猜也是。那你旅行的时候喜欢提前做详细攻略，还是到了再说？',
      '嗯嗯。你觉得旅行对你来说，更吸引你的是看新的风景，还是遇见不同的人？',
      '那我们来个情景题——在异国他乡手机钱包都丢了，你第一件事会做什么？',
      '最后聊一个——如果只能带一样东西上路（除了必需品），你会带什么？书、相机、还是日记本？📷'
    ],
    closing: '跟你聊完我已经迫不及待想去旅行了！你对旅行的态度很有意思，感觉你会是个很棒的旅伴 ✨'
  },
  {
    dim: 'SN',
    name: '美食冒险',
    context: '对新鲜事物的接受度和冒险精神，了解饮食偏好背后的性格',
    opening: '我最近发现了一家藏在巷子里的印度菜 🇮🇳 据说味道特别正宗但卖相有点狂野，你敢不敢一起去试试？',
    followUps: [
      '你也喜欢探索啊！那你觉得吃东西是为了好吃还是为了体验新鲜感？',
      '有意思。那如果你吃到一道菜很难吃，你会直接说出来还是硬着头皮吃完？',
      '哈哈了解。那你觉得自己是个对吃的很挑剔的人，还是吃什么都行？',
      '那如果朋友推荐的店你去了一看环境很脏，你会转身走还是给个面子？',
      '最后一个——你觉得一个人的饮食习惯能反映出他们的性格吗？'
    ],
    closing: '聊完好饿哈哈！感觉你对美食的态度侧面反映了你对生活的态度，挺有意思的～'
  },
  {
    dim: 'SN',
    name: '深夜思考',
    context: '探讨抽象思维和人生哲学，了解对方的内省深度',
    opening: '昨晚失眠，突然想到一个问题——如果人生可以重来一次，但你会失去现在的所有记忆，你觉得这样还有意义吗？🤔',
    followUps: [
      '哇你这个角度很独特！那你觉得人活着到底是为了经历过程，还是为了留下结果？',
      '说得真好。那如果让你给自己的人生打分，你会打几分？为什么？',
      '嗯嗯。你觉得一个人成功的标准是什么？钱、地位、还是内心的快乐？',
      '有深度。那如果可以拥有一种超能力，你会选什么？预知未来还是读心术？',
      '最后一个——你相信命运吗？还是一切都是自己选择的结果？'
    ],
    closing: '跟你聊这些让我觉得你是个内心很深的人。每个人都有自己的人生哲学，你的挺特别的 ✨'
  },
  {
    dim: 'TF',
    name: '借钱难题',
    context: '人际边界和决策原则，了解对方处理人际关系的逻辑',
    opening: '有个事想请教你。我大学室友突然找我借两万块钱，说家里有急事。但我俩已经三年没联系了，你觉得我该借吗？',
    followUps: [
      '你说的有道理。那如果换成你最要好的朋友呢，你会毫不犹豫借吗？',
      '确实。那借钱这件事，你觉得该不该写借条？会不会显得太不信任对方？',
      '我懂你的意思。那反过来，如果是你需要借钱，你会第一个想到谁？',
      '嗯嗯。你觉得朋友之间谈钱伤感情吗？还是说清楚反而更好？',
      '最后一个——你觉得自己是个在金钱上比较大方的人，还是比较谨慎的人？'
    ],
    closing: '谢谢你帮我理清思路！感觉你对钱和人情这件事有自己的原则，挺欣赏的 👍'
  },
  {
    dim: 'EI',
    name: '周末时光',
    context: '计划性和生活节奏偏好，了解对方是规划型还是随性型',
    opening: '终于周五了！你这个周末有什么安排？我一般喜欢提前计划好，但我朋友说他从不计划，睡到自然醒再说。你是哪种？',
    followUps: [
      '哈哈跟我猜的一样！那你周末更喜欢约朋友出去玩，还是一个人待着充电？',
      '懂了。那如果周六早上朋友突然叫你出去玩，但你本来打算在家躺一天，你会去吗？',
      '有道理。你觉得周末过得好不好会影响到下一周的状态吗？',
      '嗯嗯。那如果给你一个完全自由的周末，钱不用考虑，你最想做什么？',
      '最后一个——你觉得一个人周末喜欢干什么，跟他们的性格有关系吗？'
    ],
    closing: '跟你聊完感觉周末都变长了哈哈。从你怎么过周末就能看出来你是个怎样的人～'
  },
  {
    dim: 'JP',
    name: '理想生活',
    context: '对未来的规划和价值观，了解对方是务实型还是理想型',
    opening: '我刚看到一个视频，一个程序员辞职去大理开了家民宿，每天看云发呆 🌤️ 说实话你羡慕这种生活吗？还是会觉得太不稳定？',
    followUps: [
      '了解！那你理想的五年后的生活是什么样子？',
      '画面感好强。那你觉得实现这个理想最大的障碍是什么？钱、勇气、还是能力？',
      '嗯嗯。那你觉得一个人应该先追求稳定还是先追求梦想？',
      '有道理。那如果有一天你财务自由了，你会继续工作还是彻底躺平？',
      '最后一个——你觉得工作和生活应该分开，还是工作就是生活的一部分？'
    ],
    closing: '你对未来的想法很有意思。每个人心里都有一个理想生活的模样，祝你早日实现它 ✨'
  },
  {
    dim: 'EI',
    name: '团队冲突',
    context: '冲突处理方式和领导力倾向，了解对方的社交策略',
    opening: '最近组里出了点状况——两个同事为项目方向吵起来了，一个要稳扎稳打，一个要大改。我被夹在中间好尴尬，你会怎么处理这种局面？',
    followUps: [
      '你这个思路很清晰。那你觉得自己在团队里更像领导者还是协调者？',
      '确实。那如果你发现团队的方案有明显的漏洞，但大家都不想改了，你会坚持提出来还是就算了？',
      '嗯嗯了解。那你喜欢一个人独立完成任务，还是跟团队一起协作？',
      '有道理。那如果一个团队项目做得很成功，你觉得功劳应该怎么分配？',
      '最后一个——你觉得一个好的团队领导最重要的特质是什么？'
    ],
    closing: '跟你聊完我觉得你有自己处理矛盾的方法。从团队协作的方式就能看出一个人的处事哲学 👍'
  },
  {
    dim: 'JP',
    name: '童年记忆',
    context: '对过去的记忆方式和情感倾向，了解对方是细节型还是感受型',
    opening: '今天路过一个小学，听到里面在做广播体操的音乐，突然好怀念小时候。你童年印象最深的一个画面是什么？',
    followUps: [
      '好有趣的回忆！那你觉得童年经历对现在的你影响大吗？',
      '说得真好。那你小时候是个听话的孩子，还是个让家长头疼的捣蛋鬼？',
      '哈哈可爱。那你觉得现在的你跟小时候的像吗？还是有很大变化？',
      '嗯嗯。如果可以对十岁的自己说一句话，你会说什么？',
      '最后一个——你觉得一个人能真正摆脱原生家庭的影响吗？'
    ],
    closing: '听你聊这些童年回忆好温暖。过去塑造了我们，但我们也在不断成为新的自己 ❤️'
  },
  {
    dim: 'SN',
    name: '书影推荐',
    context: '审美偏好和情感共鸣方式，了解对方的内在价值取向',
    opening: '我最近剧荒了！你有推荐的吗？我什么类型都看——悬疑、爱情、科幻、纪录片都行。你最近看过什么特别打动你的？',
    followUps: [
      '有意思！你觉得一部好电影最重要的是剧情、演技、还是画面？',
      '嗯嗯。那你更容易被什么样的故事打动？热血励志的，还是温情治愈的？',
      '我懂。那看电影的时候你是那种会哭出来的人吗？还是情绪不太外露？',
      '哈哈了解。那如果一部电影大家都说好但你觉得一般，你会说出来还是随大流？',
      '最后一个——你觉得书和电影哪种形式更能触动一个人的内心？'
    ],
    closing: '谢谢你推荐！从你喜欢看什么就能大概了解你是一个怎样的人 📚'
  },
  {
    dim: 'SN',
    name: '学习习惯',
    context: '学习方式和知识获取偏好，了解对方是钻研型还是广度型',
    opening: '我最近想学一门新技能——要么学编程要么学摄影 📷 但我不确定选哪个。你学新东西的时候喜欢深挖一个领域，还是什么都接触一点？',
    followUps: [
      '确实！那你觉得自己是理论派还是实践派？先看书还是直接上手试？',
      '嗯嗯了解。那如果学了一半发现很难坚持，你会硬撑还是果断放弃？',
      '有道理。你觉得一个人学习效率最高的时候是什么状态？安静独处还是有人一起？',
      '哈哈没错。那如果有人告诉你"这个学了没用"，你会在意吗？',
      '最后一个——你觉得一个人爱不爱学习，跟性格有关系吗？'
    ],
    closing: '跟你聊完感觉你对学习有自己的方法和态度。终身学习的人最酷了 📚'
  },
  {
    dim: 'EI',
    name: '社交能量',
    context: '社交偏好和能量来源，了解对方是外向型还是内向型',
    opening: '昨天参加了一个大型派对，几十号人闹到凌晨 🎉 说实话你一年去几次这种大聚会？去完感觉是充电还是更累了？',
    followUps: [
      '哈哈我懂了。那你跟陌生人聊天会觉得尴尬吗？还是很快就能熟络起来？',
      '确实。那如果让你选——一周每天都有不同的社交局，还是一周完全不社交，你选哪个？',
      '有意思。你觉得自己在朋友眼里是活跃暖场的那个，还是安静倾听的那个？',
      '嗯嗯。那你一个人的时候会觉得无聊吗？还是特别享受独处？',
      '最后一个——你觉得内向和外向是天生的，还是后天可以改变的？'
    ],
    closing: '好有意思的讨论！从你怎么跟人相处就能看出来你是个什么性格的人 🤝'
  },
  {
    dim: 'TF',
    name: '重要决定',
    context: '决策方式和依据，了解对方是理性型还是直觉型',
    opening: '有点纠结想找你聊聊。我拿到两个工作 offer，一个稳定清闲但没什么前途，一个风险大但做成了回报很高。如果是你，你会怎么选？',
    followUps: [
      '你这个思路很清晰！那你做重大决定的时候，会列个表格分析利弊，还是靠直觉？',
      '嗯嗯。那做决定之前你会征求别人的意见吗？还是更相信自己的判断？',
      '说得对。那如果做了一个决定之后发现错了，你会后悔还是觉得学到了教训？',
      '有道理。你觉得自己是个果断的人吗？还是会犹豫很久？',
      '最后一个——如果给你一次重新选择的机会，你最想改变人生中的哪个决定？'
    ],
    closing: '听你做决定的思路很有启发！每个人的决策方式真的能反映出他们的底层性格 💡'
  },
  {
    dim: 'JP',
    name: '未来规划',
    context: '对未来的态度和规划程度，了解对方对确定性和安全感的偏好',
    opening: '我最近开始焦虑了——看到同龄人都在买房结婚，我还处于"过一天算一天"的状态 😅 你会不会也有这种同辈压力？',
    followUps: [
      '原来你也有同感！那你对自己的未来有比较明确的规划吗？比如五年内要达到什么目标？',
      '嗯嗯。那你觉得命运更多是自己掌控的，还是有很多不可控的因素？',
      '确实。那如果现在的计划和未来的机遇冲突了，你会坚持计划还是抓住机遇？',
      '有道理。你觉得一个人应该先追求稳定还是先追求热爱？',
      '最后一个——你理想中的老年生活是什么样子的？'
    ],
    closing: '谢谢你跟我聊这些！每个人都有自己的节奏，你按照自己的步调来就好 ✨'
  },
  {
    dim: 'JP',
    name: '宠物选择',
    context: '责任感和情感表达方式，了解对方的共情和照顾倾向',
    opening: '好想养只宠物啊啊 🐱 但我在纠结养猫还是养狗——猫安静独立，狗热情黏人。如果让你选，你会选哪个？',
    followUps: [
      '有道理！那你觉得自己是个比较细心、能照顾好小动物的人吗？',
      '嗯嗯。那如果你的宠物生病了需要花很多钱治疗，你会毫不犹豫地治还是理智权衡？',
      '确实。你觉得自己跟宠物相处的时候，更多是把它们当家人还是当陪伴？',
      '有意思。那你觉得养宠物的人和不养宠物的人，在性格上有什么不一样？',
      '最后一个——如果让你用一种动物形容自己，你会选什么？为什么？'
    ],
    closing: '从你怎么看宠物就能看出你是个温柔的人。对这些小生命的态度真的很能反映一个人的底色 🐾'
  },
  {
    dim: 'TF',
    name: '竞争游戏',
    context: '竞争意识和胜负欲，了解对方的进取心和压力应对',
    opening: '周末跟朋友玩了一下午桌游，结果我全程垫底 😭 你玩游戏的时候会在意输赢吗？还是开心就好？',
    followUps: [
      '哈哈了解了。那你觉得自己在生活中是个有竞争意识的人吗？还是佛系随缘？',
      '有道理。那如果你在工作中发现同事在跟你暗中竞争，你会怎么办？',
      '嗯嗯。你觉得一个人有点好胜心是好事还是坏事？',
      '确实。那你输的时候会怎么样？生闷气、复盘找原因、还是完全无所谓？',
      '最后一个——你觉得在职场上，能力和情商哪个更能让你赢？'
    ],
    closing: '跟你聊完发现你对待输赢的态度挺有意思的。竞争心其实也是了解一个人的窗口 🎯'
  },
  {
    dim: 'SN',
    name: '审美偏好',
    context: '审美品味和感知方式，了解对方的感官偏好和价值观',
    opening: '我最近在重装房间，发现选家具好难——极简风好看但有点冷，复古风温馨但容易乱。你觉得哪种风格的房间住着最舒服？',
    followUps: [
      '你品味不错诶！那你平时穿衣服也有自己的风格吗？还是随便穿不讲究？',
      '嗯嗯。那你觉得一个人的穿搭和家里的装饰，能反映出他的性格吗？',
      '有道理。那你去逛美术馆或者看展览的时候，是认真看每一幅还是走马观花？',
      '确实。你觉得自己是个在生活中有仪式感的人吗？还是怎么舒服怎么来？',
      '最后一个——你觉得美是客观存在的，还是每个人眼里的美都不一样？'
    ],
    closing: '从你怎么看美这个话题就能感受到你的性格色彩。审美真的是很个人也很性格的东西 🎨'
  },
  {
    dim: 'JP',
    name: '节日计划',
    context: '对传统的态度和组织规划能力，了解对方的社会角色倾向',
    opening: '马上过节了！你们家过节一般是走传统路线——大扫除、包饺子、看春晚，还是走新式路线——出去旅游、吃大餐？你更喜欢哪种？',
    followUps: [
      '有意思！那你觉得现在年轻人过节越来越没年味了，这个说法你同意吗？',
      '嗯嗯。那如果让你来安排一次家庭聚会，你会提前列好计划还是随机应变？',
      '确实。那给家人选礼物对你来说是开心的事还是头疼的事？',
      '哈哈了解。你觉得一个人在家庭聚会里的角色——比如负责张罗、负责吃、负责调节气氛——能反映出什么？',
      '最后一个——过年你最期待的是做什么？吃、玩、休息还是跟家人聊天？'
    ],
    closing: '聊完感觉暖暖的！从你怎么过节就能看出你是个注重什么的人。节日快乐呀 🎊'
  }
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickScenes() {
  // Stratified: pick 1 scene from each MBTI dimension to ensure full coverage
  const dims = {
    EI: SCENES.filter(s => s.dim === 'EI'),
    SN: SCENES.filter(s => s.dim === 'SN'),
    TF: SCENES.filter(s => s.dim === 'TF'),
    JP: SCENES.filter(s => s.dim === 'JP')
  };
  const picked = [
    dims.EI[Math.floor(Math.random() * dims.EI.length)],
    dims.SN[Math.floor(Math.random() * dims.SN.length)],
    dims.TF[Math.floor(Math.random() * dims.TF.length)],
    dims.JP[Math.floor(Math.random() * dims.JP.length)]
  ];
  return shuffle(picked);
}

const TYPE_NAMES = {
  INTJ:'建筑师', INTP:'逻辑学家', ENTJ:'指挥官', ENTP:'辩论家',
  INFJ:'提倡者', INFP:'调停者', ENFJ:'主人公', ENFP:'竞选者',
  ISTJ:'物流师', ISFJ:'守卫者', ESTJ:'总经理', ESFJ:'执政官',
  ISTP:'鉴赏家', ISFP:'探险家', ESTP:'企业家', ESFP:'表演者'
};

const TYPE_IMPRESSIONS = {
  INTJ:'在对话中你表现出明确的规划倾向和独立决策能力，偏好结构化思维而非随性发挥。你对效率和深度有追求。',
  INTP:'你对各种可能性保持开放态度，喜欢深入分析问题的本质。在聊天中你展现出了强烈的好奇心和逻辑思维能力。',
  ENTJ:'你回答问题果断直接，有着天然的领导者气质。你喜欢掌控节奏，对目标有着清晰的认知和追求。',
  ENTP:'你思维活跃，善于从不同角度看待问题。在对话中你展现出敏捷的思维和乐于辩论的特质。',
  INFJ:'你有着敏锐的洞察力，能感受到对话中的深层含义。你重视有意义的人际连接和深度交流。',
  INFP:'你展现出丰富的内心世界和坚定的价值观。在对话中你真诚而温暖，重视真实的情感表达。',
  ENFJ:'你天生就能理解和照顾他人的感受，在对话中展现出温暖和鼓励的态度。你有很强的感染力。',
  ENFP:'你热情洋溢，对新鲜事物充满好奇。在对话中你展现出丰富的想象力和与人连接的渴望。',
  ISTJ:'你踏实可靠，回答问题务实而直接。你重视事实和细节，有着强烈的责任感和条理性。',
  ISFJ:'你细心体贴，在对话中关注细节和他人感受。你是一个值得信赖的倾听者和支持者。',
  ESTJ:'你务实高效，注重逻辑和秩序。在对话中你展现出强烈的执行力和目标导向的思维方式。',
  ESFJ:'你温暖友善，非常重视人际关系中的和谐。在对话中你展现出极强的同理心和社交智慧。',
  ISTP:'你冷静务实，善于观察和分析。你的回答简洁直接，展现出灵活应变的问题解决能力。',
  ISFP:'你敏感而富有艺术气质，在对话中展现出独特的个人审美和价值观。你真实而不做作。',
  ESTP:'你精力充沛、行动力强，在对话中展现出敏锐的观察力和快速的反应能力。你喜欢实际的体验。',
  ESFP:'你活泼开朗，享受当下的每一刻。在对话中你充满热情，善于调动气氛和感染他人。'
};

const TYPE_DESCS = {
  INTJ:'"富有想象力和战略性的思考者，一切皆有规划"',
  INTP:'"具有创造力的逻辑学家，对知识有着永不满足的渴望"',
  ENTJ:'"大胆、果断的大将之人，善于将想法变为现实"',
  ENTP:'"聪明好奇的思想者，享受思维的碰撞和挑战"',
  INFJ:'"安静而神秘，致力于世界变得更美好的倡导者"',
  INFP:'"诗意而善良的理想主义者，总是热心于重要的事业"',
  ENFJ:'"富有魅力和鼓舞人心的领导者，有着感染他人的热情"',
  ENFP:'"热情洋溢、富有创造力的社交探索者"',
  ISTJ:'"正直务实的检查者，值得信赖的守护者"',
  ISFJ:'"温暖细心的守护者，随时准备保护所爱之人"',
  ESTJ:'"卓越的管理者，将秩序和效率带入世界"',
  ESFJ:'"极富同理心的社交者，乐于助人是他们的天性"',
  ISTP:'"大胆而实际的探险家，擅长使用各种工具"',
  ISFP:'"灵活可爱的审美家，用行动而非言语表达情感"',
  ESTP:'"精力充沛的实干家，活在当下的行动派"',
  ESFP:'"自发的娱乐者，让每一刻都充满乐趣"'
};

function clampPct(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 50;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function normalizeScorePair(leftValue, rightValue) {
  const left = Number(leftValue);
  const right = Number(rightValue);
  if (!Number.isFinite(left) || !Number.isFinite(right)) return [50, 50];
  const total = left + right;
  if (total <= 0) return [50, 50];
  const normalizedLeft = clampPct(left / total * 100);
  return [normalizedLeft, 100 - normalizedLeft];
}

function normalizeMbtiScores(rawScores = {}) {
  const [E, I] = normalizeScorePair(rawScores.E, rawScores.I);
  const [S, N] = normalizeScorePair(rawScores.S, rawScores.N);
  const [T, F] = normalizeScorePair(rawScores.T, rawScores.F);
  const [J, P] = normalizeScorePair(rawScores.J, rawScores.P);
  return { E, I, S, N, T, F, J, P };
}

function typeFromScores(scores) {
  return (scores.E > scores.I ? 'E' : 'I') +
    (scores.S > scores.N ? 'S' : 'N') +
    (scores.T > scores.F ? 'T' : 'F') +
    (scores.J > scores.P ? 'J' : 'P');
}

const FULL_REPORTS = {
  ISTJ: {impression:'"答应你的事，我一定做到。" ISTJ 给人的第一印象是可靠、严肃、有责任感。他们话不多但句句实在，做事有条不紊，是团队里最让人放心的那个人。表面看起来有点严肃甚至古板，但熟悉之后会发现他们有自己的幽默感。',traits:'极强的责任心和执行力，交代的事情不会掉链子；尊重规则和传统，认为秩序是社会运转的基础；注重实际效果，对空谈和理想主义缺乏耐心；做事有条理，善于制定和执行计划；对细节有天然的敏感度，能发现别人忽略的问题。',social:'ISTJ 的社交圈子通常不大但很稳定。他们对朋友忠诚可靠，不会说漂亮话，但会在你真正需要的时候伸出援手。他们不太擅长处理暧昧和模糊的人际关系，更喜欢明确直接的沟通方式。',growth:'尝试接受变化和不确定性，不是所有事情都需要按计划来；适当关注他人感受，道理对的同时也可以兼顾人情；偶尔跳出舒适区，尝试一些没有固定规则的新事物。'},
  ISFJ: {impression:'"我不善言辞，但会用行动爱你。" ISFJ 是那种默默付出、不求回报的人。他们温柔体贴，善于察觉别人的需求，总是在别人开口之前就伸出援手。和 ISFJ 相处会让你感到安心——他们会记住你的喜好，在你需要的时候送上关心。',traits:'极强的同理心和服务精神，乐于帮助他人；注重传统和家庭价值，珍惜亲密关系；务实可靠，做事认真负责；善于观察和记住关于别人的细节；不喜欢冲突，倾向于维护和谐氛围。',social:'ISFJ 是真正的"暖男/暖女"型人格。他们在朋友中扮演照顾者的角色，总是细心地为他人着想。虽然内向，但他们有很强的社交能力——只是更倾向于一对一或小范围的深度交往。',growth:'学会说"不"，照顾好别人之前先照顾好自己；不要把所有情绪都自己扛着，适当表达自己的需求；接受变化，不是所有传统都需要坚守。'},
  INFJ: {impression:'"我懂你的沉默，也愿陪你走过黑暗。" INFJ 是 16 种人格中最稀有（约 1-2%）的类型之一。他们拥有深刻的洞察力和强烈的使命感，仿佛天生就能看透事物的本质。INFJ 给人的感觉是温和但坚定，安静但有力量。他们善于倾听，能让人感到被真正理解。',traits:'深刻的洞察力和直觉，能看透事物本质；强烈的社会责任感和使命感；善于写作和表达抽象概念；追求有意义的人际关系和工作；完美主义倾向，对自己要求极高。',social:'INFJ 对人际关系非常挑剔，他们不需要很多朋友，但需要深度的精神共鸣。他们能敏锐地感知他人的情绪变化，但也因此容易被他人的情绪影响。INFJ 是天然的咨询师和倾听者。',growth:'不要过度追求完美，完成比完美更重要；学会保护自己的情感能量，不必对所有人都敞开；多关注当下，不要总是为未来担忧。'},
  INTJ: {impression:'"我不需要合群，只需要把事情做到极致。" INTJ 是 16 种人格中最有战略思维的类型。他们独立、理性、目标明确，是天生的问题解决者和系统构建者。INTJ 给人的第一印象往往是"严肃"和"聪明"——他们话不多，但一开口就能说到点子上。',traits:'极强的分析能力和战略思维；独立自主，不依赖他人的认可；高标准、严要求，追求卓越；善于制定长期计划并坚定执行；对知识和能力有持续的热情。',social:'INTJ 社交圈精简而优质。他们不会为了社交而社交，每段关系都有其深度和意义。INTJ 表面冷淡但内心有自己的热情所在——只是他们的热情更多献给了事业和理想，而非人际关系。',growth:'学会欣赏过程中的成长，而不只是盯着最终目标；适当关注他人的感受，理性之外也需要温度；不要用你的标准去要求所有人。'},
  ISTP: {impression:'"别 BB，看我操作。" ISTP 是 16 种人格中的动手能力之王。他们冷静、务实、善于解决实际问题，是天生的工匠和技术专家。ISTP 给人的感觉是酷酷的、不爱说话，但关键时刻总能拿出解决方案。在压力面前，ISTP 往往是最冷静的那一个。',traits:'极强的动手能力和空间感知力；冷静客观，危机时刻不慌张；热爱自由，不喜欢被规则束缚；善于分析事物运作的原理；追求刺激和新体验。',social:'ISTP 不喜欢黏腻的人际关系，他们需要自由呼吸的空间。他们的朋友通常是志同道合的人——一起做事、一起冒险，而不是整天聊感情。ISTP 虽然话不多，但有自己的幽默感，偶尔会冒出让人意外的话。',growth:'适当考虑长远规划，不只是活在当下；学会表达情感，不要总是用行动代替言语；在独立和合作之间找到平衡。'},
  ISFP: {impression:'"我用温柔，对抗世界的坚硬。" ISFP 是 16 种人格中最有艺术气质的一类。他们敏感、温柔、审美在线，善于发现生活中的美。ISFP 给人的感觉像一阵温柔的风——不强势、不喧哗，但让人感到舒适。ISFP 的内心世界丰富而多彩，只是他们不轻易向外界展示。',traits:'极高的审美敏感度，善于发现和创造美；温柔体贴，富有同理心；享受当下，活在此时此刻；不喜欢冲突，追求和谐的氛围；有自己独特的价值观，不随波逐流。',social:'ISFP 在人际关系中温柔而真诚。他们不会刻意讨好别人，但会用自己的方式关心身边的人。ISFP 需要能理解他们艺术追求和内心世界的伴侣和朋友。',growth:'不要过于回避冲突，适当的边界感很重要；相信自己的价值，不要总是低估自己；尝试将想法付诸实践，不只是停留在想象中。'},
  INFP: {impression:'"世界很吵，但我想守住内心的温柔。" INFP 是 16 种人格中最理想化的一类。他们拥有丰富的内心世界和坚定的价值观，是真正的理想主义者和梦想家。INFP 给人的感觉是温和、善良、有点不食人间烟火。他们善于倾听和理解他人，是很好的倾诉对象。',traits:'坚定的核心价值观，做自己认为对的事；丰富的想象力和创造力；极强的同理心，能深刻理解他人；追求真实和真诚，厌恶虚伪；对精神世界的追求高于物质。',social:'INFP 对朋友很挑剔，但一旦认定就是真心相待。他们渴望深度连接，对肤浅的社交感到疲惫。INFP 是很好的倾听者和支持者，但自己的情绪却常常找不到出口。',growth:'学会面对现实的残酷和不完美；不要过度否定自己，你的敏感是天赋而非弱点；适当约束完美主义，完成的比完美的好。'},
  INTP: {impression:'"别打扰我，我正在和宇宙对话。" INTP 是 16 种人格中最热爱思考的一类。他们的大脑仿佛永远在运转，对所有事物都充满好奇。INTP 给人的感觉是聪明、理性、有点"书呆子气"——他们可能不记得你的生日，但能跟你聊三个小时黑洞理论。',traits:'极强的逻辑分析能力和批判性思维；对知识有永无止境的好奇心；善于发现系统和理论中的逻辑漏洞；独立思考，不盲从权威；对创新和突破常规充满热情。',social:'INTP 最舒服的社交方式是和有共同兴趣的人深入讨论某个话题。他们不喜欢闲聊，因为觉得没有信息量。INTP 在感情中可能显得不够热情，但他们用理性的方式表达关心——比如帮你解决一个复杂的问题。',growth:'不要只思考不行动，把想法落地很重要；学会关注情感层面，不是所有事情都能用逻辑解释；适当简化思考，避免分析瘫痪。'},
  ESTP: {impression:'"干就完了，哪那么多顾虑。" ESTP 是 16 种人格中最有行动力的一类。他们精力充沛、灵活应变，是天生的冒险家和实干家。ESTP 给人的感觉是自信、有魅力、充满活力——他们是派对上的焦点，也是危机中的急先锋。和 ESTP 在一起永远不会无聊，因为他们总有新点子、新玩法。',traits:'极强的应变能力和行动力；善于说服和影响他人；享受冒险和挑战；乐观自信，充满个人魅力；务实灵活，不固执己见。',social:'ESTP 是社交达人，他们天生就知道如何与人打交道。他们的魅力和幽默感让人很容易亲近。ESTP 朋友遍天下，但深度关系需要对方能跟上他们的节奏和能量。',growth:'适当地放慢脚步，不是所有事情都需要立即行动；考虑行为的长期后果，不要只顾眼前；培养耐心，学会倾听而不只是输出。'},
  ESFP: {impression:'"人生就是要尽兴，开心最重要。" ESFP 是 16 种人格中最热情洋溢的一类。他们是天生的表演者，自带聚光灯。ESFP 给人的感觉就是开心、热情、能量满满——和他们在一起，你很难不开心起来。ESFP 是派对的组织者、气氛的带动者。',traits:'天生的表现力和感染力；乐观开朗，积极向上；慷慨大方，乐于分享；善于社交，能快速融入新环境；享受物质和感官体验。',social:'ESFP 是社交中心，他们认识很多人并且和每个人都能聊得来。他们真诚热情，不耍心机，是大家喜欢的朋友类型。ESFP 在感情中浪漫而热情，喜欢创造惊喜和仪式感。',growth:'适当为未来做规划，不能总是活在当下；学会独处，不要因为害怕安静而一直寻找刺激；做决定前多一些理性思考。'},
  ENFP: {impression:'"人生苦短，当然要活得热烈又精彩。" ENFP 是 16 种人格中最有热情和创造力的类型之一。他们像一团跳跃的火焰，走到哪里都能带来温暖和光明。ENFP 给人的感觉是热情、有趣、充满可能性——和他们聊天就像在拆盲盒，永远不知道下一个话题会飞向哪里。',traits:'无与伦比的热情和创造力；善于发现和激励他人的潜能；思维跳跃、联想丰富，创意不断；真诚善良，相信人性的美好；追求自由，不喜欢被束缚。',social:'ENFP 是社交高手，他们能和不同类型的人建立连接。他们真诚地对他人的生活感兴趣，让人感到被重视和欣赏。ENFP 在感情中浪漫、投入、充满惊喜，但需要对方理解他们对自由和空间的需求。',growth:'做事要有始有终，不能总是三分钟热度；适当过滤情绪冲击，不要被所有事情影响；专注是超能力，培养坚持下去的毅力。'},
  ENTP: {impression:'"没有我辩不赢的理。" ENTP 是 16 种人格中最机智的一类。他们思维敏捷、口才出众，是天生的辩论家和创新者。ENTP 给人的感觉是聪明、幽默、有点"欠"——他们喜欢抬杠，但不是为了赢，而是为了享受思想碰撞的过程。ENTP 的点子像流水一样源源不断。',traits:'敏捷的思维和出色的口才；享受智力对抗和思想碰撞；创意不断，善于打破常规；快速学习能力，触类旁通；对系统和制度有改进的欲望。',social:'ENTP 在社交中以幽默和机智著称。他们能让任何对话变得有趣，是聚会中的气氛制造者。ENTP 需要能和他们进行智力对等的朋友，否则会感到无聊。',growth:'执行力和专注力是需要补的课；不是所有事情都需要争论，有时候沉默是金；学会坚持，不要遇到困难就换方向。'},
  ESTJ: {impression:'"按规矩来，效率最高。" ESTJ 是 16 种人格中最有管理天分的类型。他们果断、务实、雷厉风行，是天生的领导者。ESTJ 给人的感觉是强势、靠谱、不怒自威——他们就是那个让事情发生的人。ESTJ 相信规则和秩序，认为清晰的制度和流程是高效的基础。',traits:'出色的组织和管理能力；果断的决策力和行动力；重视规则、秩序和效率；极强的责任感和职业道德；诚实直接，不玩虚的。',social:'ESTJ 在社交中直来直去，不喜欢复杂的社交游戏。他们对朋友真诚直率，但也会用同样的标准要求朋友。ESTJ 在感情中是可靠的一方，他们会用实际行动表达爱——比如帮你解决问题、照顾家庭。',growth:'适时放权，不必事事亲力亲为；学会照顾他人的感受，道理之外也有温度；偶尔打破规则，体验不一样的可能性。'},
  ESFJ: {impression:'"大家好才是真的好。" ESFJ 是 16 种人格中最有社交温度的类型。他们热情、体贴、善于照顾人，是朋友圈里的"大管家"。ESFJ 给人的感觉是温暖、亲切、让人安心——他们是那个记得每个人生日、组织每一次聚会的人。ESFJ 非常在意关系的和谐，会主动维护团队氛围。',traits:'热情体贴，善于照顾他人；极强的社交意识和协调能力；重视传统和家庭价值观；责任感强，做事认真负责；喜欢有组织和计划的生活。',social:'ESFJ 是社交网络的核心节点。他们善于维持关系，记得每个人的重要日子。ESFJ 在关系中付出很多，也希望得到相应的认可和感激。他们讨厌冲突，会竭尽全力维护和谐。',growth:'不要为了讨好别人而委屈自己；学会从批评中看到成长机会，不要过于在意他人的看法；偶尔也要为自己活，而不是为他人而活。'},
  ENFJ: {impression:'"我想把光带给每一个人。" ENFJ 是 16 种人格中最有领袖魅力的类型。他们天生具有感染力和号召力，能激励他人朝着共同的目标努力。ENFJ 给人的感觉是温暖、有力量、值得信赖——他们是那个让你相信自己可以做得更好的人。ENFJ 是天生的导师和引路人。',traits:'天生的领导力和感染力；深刻的同理心和洞察力；善于激励和成就他人；出色的沟通和表达能力；强烈的社会责任感和使命感。',social:'ENFJ 是人际关系的高手。他们真诚关心他人，能让人感到被重视和理解。ENFJ 在感情中全心全意投入，是浪漫而体贴的伴侣。他们需要伴侣能理解他们对事业和理想的热忱。',growth:'照顾好自己才能更好地照顾他人；接受不是所有人都愿意被你"帮助"；放下对完美的执着，允许事情不按照预期发展。'},
  ENTJ: {impression:'"别问怎么做，跟着我干就对了。" ENTJ 是 16 种人格中最有统帅气场的类型。他们果断、自信、目标明确，是天生的战略领导者。ENTJ 给人的感觉是强势、有魄力、效率至上——他们是那种一进会议室就能让所有人安静下来的人。ENTJ 的大脑像一台精密的机器，永远在计算最优解。',traits:'天生的战略思维和领导力；极强的执行力和决策力；目标导向，效率至上；自信果断，敢于承担责任；不断追求进步和卓越。',social:'ENTJ 在社交中同样目标明确——他们建立关系是为了达成共同的目标。他们欣赏能力强、有主见的人。ENTJ 在感情中需要一个能和他们并肩作战的伴侣，而不是一个需要被照顾的人。',growth:'学会倾听不同的声音，即使你认为是错的；适当放慢脚步，享受过程而不仅仅是结果；对他人多一些耐心和包容，不是所有人都像你一样。'}
};

Page({
  data: {
    messages: [],
    inputValue: '',
    sceneIndex: 0,
    selectedScenes: [],
    totalScenes: 0,
    currentScene: '',
    sceneProgress: 25,
    isTyping: false,
    typingTimer: null,
    charIndex: 0,
    turnInScene: 0,
    chatComplete: false,
    resultReady: false,
    resultGenerating: false,
    scrollAnchor: 'a',
    dailyUsed: 0,
    dailyLimit: 3,
    typingMessageActive: false,
    sending: false,
    keyboardHeight: 0
  },
  scrollToBottom() {
    const next = this.data.scrollAnchor === 'a' ? 'b' : 'a';
    this.setData({ scrollAnchor: next });
  },
  onLoad() {
    const app = getApp();
    const { used } = app.incrementDailyChatCount();
    const selected = pickScenes();
    this.setData({
      selectedScenes: selected,
      totalScenes: selected.length,
      currentScene: selected[0].name,
      sceneProgress: Math.round(100 / selected.length),
      dailyUsed: used
    });
    this.startChat();
    wx.onKeyboardHeightChange(res => {
      this.setData({ keyboardHeight: res.height });
      if (res.height > 0) {
        setTimeout(() => this.scrollToBottom(), 300);
      }
    });
  },
  onUnload() {
    if (this.data.typingTimer) clearInterval(this.data.typingTimer);
  },
  onInputFocus() {
    if (this.data.keyboardHeight > 0) {
      setTimeout(() => this.scrollToBottom(), 300);
    }
  },

  callAI(mode) {
    const scene = this.data.selectedScenes[this.data.sceneIndex];
    // Opening a new scene: fresh history so AI doesn't continue previous topic
    const historyForAI = mode === 'opening'
      ? []
      : this.data.messages
          .filter(m => m.role !== 'system' && m.text && m.text.trim())
          .slice(-12)
          .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));
    console.log('[AI] callAI mode=' + mode + ' historyLen=' + historyForAI.length);
    return wx.cloud.callFunction({
      name: 'chatAI',
      data: {
        mode,
        history: historyForAI,
        scene: { name: scene.name, opening: scene.opening, context: scene.context },
        isNewChat: mode === 'opening' && this.data.sceneIndex === 0,
        round: this.data.turnInScene + 1,
        totalRounds: 5,
        nextScene: (this.data.selectedScenes[this.data.sceneIndex + 1] || {}).name || ''
      }
    }).then(res => {
      if (res.result && res.result.ok && res.result.text) {
        return res.result.text;
      }
      if (res.result && res.result.error === 'too_frequent' && res.result.text) {
        throw new Error('too_frequent');
      }
      if (res.result && res.result.error === 'daily_limit') {
        throw new Error('daily_limit');
      }
      throw new Error(res.result?.error || 'empty AI response');
    });
  },
  startChat() {
    const scene = this.data.selectedScenes[0];
    this.setData({ isTyping: true, typingMessageActive: false });
    this.callAI('opening')
      .then(text => {
        console.log('[AI] opening:', text.slice(0, 50));
        this.typeMessage(text);
      })
      .catch(e => {
        console.warn('[AI] opening failed, fallback:', e.message);
        this.typeMessage(scene.opening);
      });
  },
  typeMessage(text, onDone, keepTyping = false) {
    // Split by double newline: send as separate message bubbles
    const parts = text.split(/\n\n/).filter(p => p.trim());
    if (parts.length > 1) {
      const chain = (idx) => {
        if (idx >= parts.length) { if (onDone) onDone(); return; }
        const last = idx === parts.length - 1;
        this.typeMessage(parts[idx].trim(), last ? onDone : () => {
          setTimeout(() => chain(idx + 1), 400);
        }, !last);
      };
      chain(0);
      return;
    }

    this.setData({ isTyping: true, typingMessageActive: true });

    const msgId = Date.now();
    const newMsg = {
      id: msgId,
      role: 'ai',
      text: text,
      displayText: '',
      showCursor: true
    };

    const anchor = this.data.scrollAnchor === 'a' ? 'b' : 'a';
    this.setData({
      messages: [...this.data.messages, newMsg],
      isTyping: true,
      scrollAnchor: anchor
    });

    let charIndex = 0;
    const timer = setInterval(() => {
      charIndex++;
      const tick = this.data.scrollAnchor === 'a' ? 'b' : 'a';
      if (charIndex > text.length) {
        clearInterval(timer);
        const msgs = this.data.messages;
        const last = msgs[msgs.length - 1];
        if (last && last.id === msgId) {
          last.displayText = text;
          last.showCursor = false;
          this.setData({ messages: msgs, isTyping: keepTyping, typingMessageActive: false, scrollAnchor: tick });
        }
        if (onDone) onDone();
        return;
      }

      const msgs = this.data.messages;
      const last = msgs[msgs.length - 1];
      if (last && last.id === msgId) {
        last.displayText = text.substring(0, charIndex);
        this.setData({ messages: msgs, scrollAnchor: tick });
      }
    }, 40);
  },
  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },
  sendMessage() {
    const text = this.data.inputValue.trim();
    if (!text || this.data.isTyping || this.data.chatComplete || this.data.sending) return;
    this.setData({ sending: true });
    this._sendAfterCheck(text);
  },
  _sendAfterCheck(text) {
    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: text,
      displayText: text
    };
    const anchor = this.data.scrollAnchor === 'a' ? 'b' : 'a';
    this.setData({
      messages: [...this.data.messages, userMsg],
      inputValue: '',
      turnInScene: this.data.turnInScene + 1,
      isTyping: true,
      typingMessageActive: false,
      sending: false,
      scrollAnchor: anchor
    });

    setTimeout(() => {
      this.respondToUser();
    }, 300);
  },
  respondToUser() {
    const scene = this.data.selectedScenes[this.data.sceneIndex];
    const turn = this.data.turnInScene;
    const isLastScene = this.data.sceneIndex === this.data.selectedScenes.length - 1;

    if (turn < 5) {
      this.callAI('followup')
        .then(text => {
          console.log('[AI] followup:', text.slice(0, 50));
          this.typeMessage(text);
        })
        .catch(e => {
          console.warn('[AI] followup failed:', e.message);
          const fb = scene.followUps[turn - 1];
          if (fb) this.typeMessage(fb);
        });
    } else if (turn === 5) {
      const mode = isLastScene ? 'closing' : 'transition';
      this.callAI(mode)
        .then(text => {
          console.log('[AI] ' + mode + ':', text.slice(0, 50));
          this.typeMessage(text, () => {
            this.finishScene();
          });
        })
        .catch(e => {
          console.warn('[AI] ' + mode + ' failed:', e.message);
          const fallback = isLastScene
            ? '好啦，今天聊了这么多，感觉我对你的性格有了比较立体的了解～来看看分析结果吧'
            : scene.closing;
          this.typeMessage(fallback, () => {
            this.finishScene();
          });
        });
    }
  },
  finishScene() {
    const isLastScene = this.data.sceneIndex === this.data.selectedScenes.length - 1;
    if (isLastScene) {
      const completeMsg = {
        id: Date.now(),
        role: 'system',
        text: '场景测试完成'
      };
      const anchor = this.data.scrollAnchor === 'a' ? 'b' : 'a';
      this.setData({
        messages: [...this.data.messages, completeMsg],
        turnInScene: 0,
        isTyping: true,
        scrollAnchor: anchor
      });
      this.setData({ chatComplete: true, isTyping: false });
      this.generateResult().then(() => {
        this.goToResult();
      });
      return;
    }

    // Transition to next scene — keep isTyping true to block user input
    const completeMsg = {
      id: Date.now(),
      role: 'system',
      text: '场景完成 · 进入下一话题'
    };
    const nextIdx = this.data.sceneIndex + 1;
    const anchor = this.data.scrollAnchor === 'a' ? 'b' : 'a';
    this.setData({
      messages: [...this.data.messages, completeMsg],
      turnInScene: 0,
      sceneIndex: nextIdx,
      currentScene: this.data.selectedScenes[nextIdx].name,
      sceneProgress: ((nextIdx + 1) / this.data.selectedScenes.length) * 100,
      isTyping: true,
      typingMessageActive: false,
      scrollAnchor: anchor
    });

    // Call AI opening immediately — isTyping stays true until typeMessage finishes
    this.callAI('opening')
      .then(text => {
        console.log('[AI] next opening:', text.slice(0, 50));
        this.typeMessage(text);
      })
      .catch(e => {
        console.warn('[AI] next opening failed:', e.message);
        this.typeMessage(this.data.selectedScenes[nextIdx].opening);
      });
  },
  generateResult() {
    this.setData({ resultGenerating: true, resultReady: false });
    const transcript = this.data.messages
      .filter(m => (m.role === 'user' || m.role === 'ai') && m.text && m.text.trim())
      .map(m => (m.role === 'user' ? 'Q: ' : 'A: ') + m.text)
      .join('\n');

    const fallbackRandom = () => {
      const types = Object.keys(TYPE_NAMES);
      const type = types[Math.floor(Math.random() * types.length)];
      const pE = Math.floor(Math.random() * 100);
      const pI = 100 - pE;
      const pS = Math.floor(Math.random() * 100);
      const pN = 100 - pS;
      const pT = Math.floor(Math.random() * 100);
      const pF = 100 - pT;
      const pJ = Math.floor(Math.random() * 100);
      const pP = 100 - pJ;
      const report = FULL_REPORTS[type] || {};
      getApp().globalData.currentResult = {
        resultType: type,
        resultName: TYPE_NAMES[type],
        resultDesc: TYPE_DESCS[type],
        impression: report.impression || TYPE_IMPRESSIONS[type] || '',
        report: (report.traits || '') + '\n\n' + (report.social || ''),
        growth: report.growth || '',
        pE, pI, pS, pN, pT, pF, pJ, pP,
        confidence: 0,
        _fallback: true
      };
    };

    return wx.cloud.callFunction({
      name: 'analyzeMBTI',
      data: { transcript }
    }).then(res => {
      if (res.result && res.result.ok) {
        const { type, scores: rawScores, confidence } = res.result;
        const scores = normalizeMbtiScores(rawScores);
        const normalizedType = typeFromScores(scores);
        console.log('[AI] analyze result:', type, rawScores, 'normalized:', normalizedType, scores, 'confidence:', confidence);
        const report = FULL_REPORTS[normalizedType] || {};
        getApp().globalData.currentResult = {
          resultType: normalizedType,
          resultName: TYPE_NAMES[normalizedType],
          resultDesc: TYPE_DESCS[normalizedType],
          ...(report),
          pE: scores.E, pI: scores.I,
          pS: scores.S, pN: scores.N,
          pT: scores.T, pF: scores.F,
          pJ: scores.J, pP: scores.P,
          borderlineEI: scores.E === scores.I,
          borderlineSN: scores.S === scores.N,
          borderlineTF: scores.T === scores.F,
          borderlineJP: scores.J === scores.P,
          confidence: confidence ?? 0.5
        };
      } else {
        throw new Error(res.result?.error || 'analyze failed');
      }
    }).catch(e => {
      console.warn('[AI] analyze failed, fallback to random:', e.message);
      fallbackRandom();
    }).then(() => {
      this.setData({ resultGenerating: false, resultReady: true });
    });
  },
  goToResult() {
    const app = getApp();
    const result = app.globalData.currentResult;
    if (!result) {
      wx.showToast({ title: '结果生成中，请稍候', icon: 'none' });
      return;
    }
    if (this._resultSaved) {
      wx.navigateTo({ url: '/pages/result/result' });
      return;
    }
    this._resultSaved = true;
    const historyEntry = {
      type: result.resultType,
      name: result.resultName,
      dims: [
        Math.max(result.pI, result.pE),
        Math.max(result.pN, result.pS),
        Math.max(result.pF, result.pT),
        Math.max(result.pJ, result.pP)
      ],
      date: new Date().toLocaleDateString('zh-CN'),
      source: 'AI对话'
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
  goBack() {
    wx.navigateBack();
  }
});
