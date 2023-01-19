/*
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2022-01-11 15:24:49
 * @LastEditTime: 2022-06-21 18:34:34
 * @LastEditors: Gavin
 */
import firstPrizeImg from '../img/prize_2023.png'
import secondPrizeImg from '../img/prize_888.png'
import thirdPrizeImg from '../img/prize_188.png'
import lotteryMusic from '../data/lottery.mp3'
// import fourthImg from '../img/edifier.jpg'

const userArr = [
    ["000001", "狄仁杰", "宰相"]
  , ["000002", "李元芳", "大将军"]
  , ["000003", "张环", "八大军头"]
  , ["000004", "李朗", "八大军头"]
  , ["000005", "杨方", "八大军头"]
  , ["000006", "仁阔", "八大军头"]
  , ["000007", "齐虎", "八大军头"]
  , ["000008", "潘越", "八大军头"]
  , ["000009", "沈韬", "八大军头"]
  , ["000010", "肖豹", "八大军头"]
  , ["000011", "闪灵", "六大蛇首"]
  , ["000012", "血灵", "六大蛇首"]
  , ["000013", "剑灵", "六大蛇首"]
  , ["000014", "魔灵", "六大蛇首"]
  , ["000015", "变灵", "六大蛇首"]
  , ["000016", "动灵", "六大蛇首"]
  , ["000017", "虎云", "铁手团"]
  , ["000018", "豹冲", "铁手团"]
  , ["000019", "熊煞", "铁手团"]
  , ["000020", "貔貅", "铁手团"]
  , ["000021", "狻猊", "铁手团"]
  , ["000022", "狼拳", "铁手团"]
  , ["000023", "豺泽", "铁手团"]
  , ["000024", "獬柱", "铁手团"]
]

function randomsort(a, b) {
  return Math.random() > .5 ? -1 : 1;
  //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}



const user = userArr.sort(randomsort)
/**
 * 卡片公司名称标识
 */
const COMPANY = "STDRJ";
/**
 * 奖品设置
 * type: 唯一标识，0是默认特别奖的占位符，其它奖品不可使用
 * count: 奖品数量
 * title: 奖品描述
 * text: 奖品标题
 * img: 图片地址
 * ROTATE_TIME:转的球速度越大越慢
 * circle:旋转圈数最好8*x倍数
 * enter: //抽奖进行时音乐
 * awards: //颁奖音乐
 */
const prizes = [
  {
    type: 0,
    count: 1000,
    title: "抽奖结束",
    text: "需要重新抽奖请配置后重置"
  },
  {
    type: 1,
    count: 1, // 抽奖数量
    text: "大展宏兔奖",
    title: "(2023元)",
    img: firstPrizeImg,
    enter: lotteryMusic,//抽奖进行时音乐
    awards: "1st-BJ-BGM",//颁奖音乐
    ROTATE_TIME: 8000,
    circle: 8
  },
  {
    type: 2,
    count: 3,
    text: "钱兔无量奖",
    title: "(1888元)",
    img: secondPrizeImg,
    enter: lotteryMusic,//抽奖进行时音乐
    awards: "other-BJ-BGM",//颁奖音乐
    ROTATE_TIME: 8000,
    circle: 8
  },
  {
    type: 3,
    count: 5,
    text: "扬眉兔气奖",
    title: "(888元)",
    img: thirdPrizeImg,
    enter: lotteryMusic,//抽奖进行时音乐
    awards: "other-BJ-BGM",//颁奖音乐
    ROTATE_TIME: 8000,
    circle: 8
  },
  // {
  //   type: 4,
  //   count: 10,
  //   text: "四等奖",
  //   title: "价值300-600元不等",
  //   img: fourthImg,
  //   enter: lotteryMusic,//抽奖进行时音乐
  //   awards: "other-BJ-BGM",//颁奖音乐
  //   ROTATE_TIME: 8000,
  //   circle: 8
  // }

];
let luckyData = JSON.parse(localStorage.getItem("luckyData")) || {};

let leftUsers = JSON.parse(localStorage.getItem("leftUsers")) || user;

let awardList = JSON.parse(localStorage.getItem("awardList")) || {}


//不能说的秘密
const excludeUser = [[]]
/**
 * @description: 不能说的秘密
 * @param {*} nowItem 当前奖品
 * @param {*} basicData 当前奖池人员
 * @return {*}
 * @Date: 2022-01-13 15:13:31
 */
function setSecret(nowItem, basicData) {
  if (nowItem.type != 4) {
    // console.log(mockData.excludeUser);
    const excludeId = excludeUser.map(item => item[0])
    // console.log(excludeId, basicData.leftUsers);
    basicData.leftUsers = basicData.leftUsers.filter(human => !excludeId.includes(human[0]))
    // console.log(basicData.leftUsers);
  }
}
//颜色
const rgba = "0,0,0"
//透明度
const opacity = () => 0.3 || Math.random() * 0.7 + 0.25
//气氛组卡片
const atmosphereGroupCard = () => `rgba(${rgba},${opacity()})`
//背景色
const background = "url(../img/core_bg.jpg)"; //url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ef5e59c878d5a8012053f8c53ab7.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1645253836&t=e6413ccc6469632cf5476f5f6067e13b)"
//背景动态壁纸模式 不用时可以设置为null或者注释
// const bgVideo="//game.gtimg.cn/images/lol/act/a20220121lunarpass/bg.mp4"
const width = window.innerWidth * .75
const height = window.innerWidth * .75 * .75
/**
 * 一次抽取的奖品个数与prizes对应
 */
const EACH_COUNT = [1, 1, 3, 5];
const bgVideo = null;
export default { EACH_COUNT, prizes, COMPANY, user, luckyData, leftUsers, awardList, excludeUser, atmosphereGroupCard, background, setSecret, width, height, bgVideo }
