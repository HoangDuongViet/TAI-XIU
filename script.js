const taiInput = document.getElementById("tai-input");
const xiuInput = document.getElementById("xiu-input");
const betButton = document.getElementById("bet-button");
const resultText = document.getElementById("result-text");
const resultValue = document.getElementById("result-value");
const moneyText = document.getElementById("money-text");

let countdownInterval;
let randomInterval;
let money = 10000; // Số tiền ban đầu

moneyText.textContent = `Số tiền hiện có: ${money} VNĐ`;

betButton.addEventListener("click", () => {
	const taiAmount = parseInt(taiInput.value) || 0;
	const xiuAmount = parseInt(xiuInput.value) || 0;

	if (taiAmount <= money && xiuAmount <= money) {
		startCountdown(taiAmount, xiuAmount);
	} else {
		alert("Số tiền cược không hợp lệ!");
	}
});

function startCountdown(taiAmount, xiuAmount) {
	disableInputs(true);

	let count = 10;
	resultText.textContent = `Kết quả sẽ hiển thị sau ${count} giây...`;
	resultValue.textContent = "";

	countdownInterval = setInterval(() => {
		count--;
		resultText.textContent = `Kết quả sẽ hiển thị sau ${count} giây...`;

		if (count === 0) {
			clearInterval(countdownInterval);
			clearInterval(randomInterval);
			playGame(taiAmount, xiuAmount);
		}
	}, 1000);

	randomInterval = setInterval(() => {
		const randomNumber = getRandomNumber(1, 6);
		resultValue.textContent = randomNumber;
	}, 200);
}

function playGame(taiAmount, xiuAmount) {
	const randomNumber = parseInt(resultValue.textContent);
	const result = randomNumber <= 3 ? "TÀI" : "XỈU";

	resultText.textContent = `Kết quả: ${randomNumber} - ${result}`;

	let resultMessage = "";

	if (result === "TÀI") {
		const winAmount = taiAmount * 2; // Số tiền thắng bằng số tiền ăn được (2 lần số tiền đặt)
		money += winAmount - xiuAmount; // Trừ số tiền đặt bên kia bị thua
		if (winAmount - xiuAmount < 0) {
			resultMessage += `${winAmount - xiuAmount} VNĐ  `;
		} else {
			resultMessage += `+${winAmount - xiuAmount} VNĐ  `;
		}
	} else {
		const winAmount = xiuAmount * 2; // Số tiền thắng bằng số tiền ăn được (2 lần số tiền đặt)
		money += winAmount - taiAmount; // Trừ số tiền đặt bên kia bị thua
		if (winAmount - taiAmount < 0) {
			resultMessage += `${winAmount - taiAmount} VNĐ  `;
		} else {
			resultMessage += `+${winAmount - taiAmount} VNĐ  `;
		}
	}

	if (resultMessage === "") {
		resultMessage = "Không có cược nào thắng. ";
	}

	moneyText.textContent = `Số tiền hiện có: ${money} VNĐ`;
	resultValue.textContent = resultMessage;

	disableInputs(false);
}

function disableInputs(disabled) {
	taiInput.disabled = disabled;
	xiuInput.disabled = disabled;
	betButton.disabled = disabled;
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

taiInput.addEventListener("click", clearInputValue);
xiuInput.addEventListener("click", clearInputValue);

function clearInputValue(event) {
	event.target.value = "";
}
