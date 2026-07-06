(function () {
    "use strict";

    var STAGE_WIDTH = 1280;
    var LEVEL_GAUGE_MAX = 10;
    var CAR_START_X = -350;
    var CAR_END_X = STAGE_WIDTH;
    var CAR_DURATION_MS = 10000;

    var numberButtons = [
        { key: "1", normal: "res/btn_1.png", hit: "res/btn_1_hit.png" },
        { key: "2", normal: "res/btn_2.png", hit: "res/btn_2_hit.png" },
        { key: "3", normal: "res/btn_3.png", hit: "res/btn_3_hit.png" },
        { key: "4", normal: "res/btn_4.png", hit: "res/btn_4_hit.png" },
        { key: "5", normal: "res/btn_5.png", hit: "res/btn_5_hit.png" },
        { key: "6", normal: "res/btn_6.png", hit: "res/btn_6_hit.png" },
        { key: "7", normal: "res/btn_7.png", hit: "res/btn_7_hit.png" },
        { key: "8", normal: "res/btn_8.png", hit: "res/btn_8_hit.png" },
        { key: "9", normal: "res/btn_9.png", hit: "res/btn_9_hit.png" },
        { key: "back", normal: "res/btn_back.png", hit: "res/btn_back_hit.png" },
        { key: "0", normal: "res/btn_0.png", hit: "res/btn_0_hit.png" },
        { key: "enter", normal: "res/btn_enter.png", hit: "res/btn_enter_hit.png" }
    ];

    var state = {
        answer: "0",
        rightAnswer: 0,
        comboCount: 0,
        levelGaugeCount: 3,
        carAnimStart: null,
        carAnimFrame: null,
        carResolved: false
    };

    var el = {};

    function q(id) {
        return document.getElementById(id);
    }

    function cacheElements() {
        el.stageWrap = q("stage-wrap");
        el.stage = q("stage");
        el.answerLabel = q("answerLabel");
        el.expressionLabel = q("expressionLabel");
        el.car = q("car");
        el.answerO = q("answerO");
        el.answerX = q("answerX");
        el.levelGauge = q("levelGauge");
        el.comboEffect = q("comboEffect");
        el.numPad = q("numPad");
        el.btnHome = q("btnHome");
        el.btnUserMenu = q("btnUserMenu");
    }

    function buildLevelGauge() {
        el.levelGauge.innerHTML = "";
        for (var i = 0; i < LEVEL_GAUGE_MAX; i++) {
            var img = document.createElement("img");
            img.className = "gauge-cell";
            if (i === 0) {
                img.src = "res/image_levelguage_top.png";
            } else if (i === LEVEL_GAUGE_MAX - 1) {
                img.src = "res/image_levelguage_below.png";
            } else {
                img.src = "res/image_levelguage_center.png";
            }
            img.style.top = (i * 32) + "px";
            img.dataset.index = i;
            el.levelGauge.appendChild(img);
        }
    }

    function drawLevelGauge() {
        var cells = el.levelGauge.querySelectorAll(".gauge-cell");
        cells.forEach(function (cell) {
            var i = parseInt(cell.dataset.index, 10);
            var visible = i >= LEVEL_GAUGE_MAX - state.levelGaugeCount;
            cell.style.visibility = visible ? "visible" : "hidden";
        });
    }

    function increaseLevelGauge() {
        state.levelGaugeCount = Math.min(LEVEL_GAUGE_MAX, state.levelGaugeCount + 1);
        drawLevelGauge();
    }

    function decreaseLevelGauge() {
        state.levelGaugeCount = Math.max(0, state.levelGaugeCount - 2);
        drawLevelGauge();
    }

    function showComboEffect(count) {
        if (count > 0 && count % 10 === 0) {
            el.comboEffect.src = "res/efc_10combo.png";
        } else if (count > 0 && count % 5 === 0) {
            el.comboEffect.src = "res/efc_5combo.png";
        } else {
            return;
        }
        el.comboEffect.hidden = false;
        clearTimeout(showComboEffect._timer);
        showComboEffect._timer = setTimeout(function () {
            el.comboEffect.hidden = true;
        }, 900);
    }

    function increaseCombo() {
        state.comboCount++;
        showComboEffect(state.comboCount);
    }

    function resetCombo() {
        state.comboCount = 0;
    }

    function buildNumPad() {
        el.numPad.innerHTML = "";
        numberButtons.forEach(function (btn) {
            var button = document.createElement("button");
            button.style.backgroundImage = "url(" + btn.normal + ")";
            button.dataset.key = btn.key;
            button.addEventListener("mousedown", function () {
                button.style.backgroundImage = "url(" + btn.hit + ")";
            });
            ["mouseup", "mouseleave"].forEach(function (evt) {
                button.addEventListener(evt, function () {
                    button.style.backgroundImage = "url(" + btn.normal + ")";
                });
            });
            button.addEventListener("click", function () {
                onKeyPress(btn.key);
            });
            el.numPad.appendChild(button);
        });
    }

    function setAnswerLabel(text) {
        state.answer = String(text);
        el.answerLabel.textContent = state.answer;
    }

    function onKeyPress(key) {
        if (key === "back") {
            setAnswerLabel("0");
        } else if (key === "enter") {
            compareInputAndAnswer();
        } else {
            if (state.answer === "0") {
                setAnswerLabel(key);
            } else {
                setAnswerLabel(state.answer + key);
            }
        }
    }

    function randomExpression() {
        var augend = Math.floor(Math.random() * 10) + 1;
        var addend = Math.floor(Math.random() * 10) + 1;
        el.expressionLabel.textContent = augend + " + " + addend;
        state.rightAnswer = augend + addend;
    }

    function spawnCar() {
        state.carResolved = false;
        el.answerO.hidden = true;
        el.answerX.hidden = true;
        el.car.style.transition = "none";
        el.car.style.left = CAR_START_X + "px";
        // force reflow so the browser applies the reset position before animating
        void el.car.offsetWidth;
        randomExpression();
        setAnswerLabel("0");
        state.carAnimStart = null;
        state.carAnimFrame = requestAnimationFrame(animateCar);
    }

    function animateCar(timestamp) {
        if (state.carResolved) return;
        if (state.carAnimStart === null) state.carAnimStart = timestamp;
        var elapsed = timestamp - state.carAnimStart;
        var progress = Math.min(1, elapsed / CAR_DURATION_MS);
        var x = CAR_START_X + (CAR_END_X - CAR_START_X) * progress;
        el.car.style.left = x + "px";
        if (progress >= 1) {
            resolveCar(false, false);
            return;
        }
        state.carAnimFrame = requestAnimationFrame(animateCar);
    }

    function compareInputAndAnswer() {
        if (state.carResolved) return;
        var isCorrect = parseInt(state.answer, 10) === state.rightAnswer;
        resolveCar(isCorrect, true);
    }

    function resolveCar(isCorrect, wasAnswered) {
        if (state.carResolved) return;
        state.carResolved = true;
        if (state.carAnimFrame) cancelAnimationFrame(state.carAnimFrame);

        if (isCorrect) {
            el.answerO.hidden = false;
            increaseLevelGauge();
            increaseCombo();
        } else {
            el.answerX.hidden = false;
            decreaseLevelGauge();
            resetCombo();
        }

        setTimeout(function () {
            spawnCar();
        }, wasAnswered ? 700 : 300);
    }

    function fitStage() {
        var scale = Math.min(1, el.stageWrap.clientWidth / STAGE_WIDTH);
        el.stage.style.transform = "scale(" + scale + ")";
        el.stageWrap.style.height = (el.stage.offsetHeight * scale) + "px";
    }

    function bindGlobalKeys() {
        document.addEventListener("keydown", function (e) {
            if (e.key >= "0" && e.key <= "9") {
                onKeyPress(e.key);
            } else if (e.key === "Backspace") {
                onKeyPress("back");
            } else if (e.key === "Enter") {
                onKeyPress("enter");
            }
        });
    }

    function init() {
        cacheElements();
        buildLevelGauge();
        buildNumPad();
        drawLevelGauge();
        bindGlobalKeys();
        el.btnHome.addEventListener("click", function () {});
        el.btnUserMenu.addEventListener("click", function () {});
        window.addEventListener("resize", fitStage);
        fitStage();
        spawnCar();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
