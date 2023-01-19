import * as XLSX from 'xlsx/xlsx.mjs';
import mockData from "./mock";
import { btns, currentPrize, currentPrizeIndex, basicData, currentLuckys } from "./index";

const transformData = (data) => {
	let idx = 1;
	const header = ['序号', '姓名', '二级部门'];
	const result = [];
	for(const key in data) {
		if(!data.hasOwnProperty(key)) return;
		const curPrize = mockData.prizes[idx++];
		const val = data[key];
		if(val.length === curPrize.count) {
			result.push(['', curPrize.text, ''], header, ...val);
		}
	}
	return result;
}
export const saveAndDownloadData = () => {
	const luckyData = localStorage.getItem('luckyData') || [];
	try {
		const jsonData = JSON.parse(luckyData);
		const arrData = transformData(jsonData);
		console.log({ arrData })
		const sheetName = '中奖名单';
		const jsonWorkSheet = XLSX.utils.json_to_sheet(arrData);
		const workBook = {
			SheetNames: [sheetName],
			Sheets: {
				[sheetName]: jsonWorkSheet
			}
		}
		XLSX.writeFile(workBook, 'WinningList-2023.xlsx');
	}catch (e) {
		console.log(e)
	}
};
// 控制重新抽奖按钮展示
export const handleReLotteryBtnShow = () => {
	// 抽一等奖的时候展示重新抽奖按钮
	const reLotteryBtnElement = btns.reLotteryBtn;
	if(+currentPrize.type === 1 && reLotteryBtnElement.classList.contains('none')) {
		btns.reLotteryBtn.classList.remove('none');
	}
}
// 设置#lottery 按钮文案
export function setLotteryBtnText() {
	const isFinished = isLotteryFinished();
	btns.lotteryBtn.innerText = isFinished ? '保存数据' : '开始抽奖';
}
// 是否抽奖结束了
export function isLotteryFinished() {
	// 已中奖人员名单
	const alreadyWinners = basicData.luckyUsers[currentPrize.type] || [];
	// 此次抽奖后中奖的人员名单
	const newWinners = [...alreadyWinners, ...currentLuckys];
	const prizeCountEmpty = newWinners.length === currentPrize.count;
	return +currentPrizeIndex <= 1 && prizeCountEmpty;
}
