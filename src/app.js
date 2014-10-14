var size;
function makeImage(src, argx, argy) {
    var imageObject = cc.Sprite.create(src);
    imageObject.attr({
        x: argx * 2,
        y: size.height - (argy * 2),
        anchorX: 0,
        anchorY : 1.0
    });
    return imageObject;
}
function makeLabel(text, textSize, argx, argy, argColor) {
    var labelObject = cc.LabelTTF.create(text, "Arial", textSize * 2);
    labelObject.attr({
        x: argx * 2,
        y: size.height - (argy * 2), 
        anchorX : 0,
        anchorY : 1.0,
        color : argColor
    });
    return labelObject;
}

function makeMenuItem(srcNormal, srcHighlighted, callback, object, argx, argy, tag) {
    var menuItemObject = cc.MenuItemImage.create(
        srcNormal,
        srcHighlighted,
        null,
        callback,
        object);
    menuItemObject.attr({
        x: argx * 2,
        y: argy * 2,
        anchorX: 0,
        anchorY: 1.0,
        tag : tag
    });
    return menuItemObject;
}

var CarSprite = cc.Sprite.extend({
    expressionLabel : null,
    ctor:function(src, x, y){
        this._super();
        this.initWithFile(src);
        this.attr({
            x: x,
            y: y,
            anchorX: 0,
            anchorY : 1.0
        });
        that = this;
        expressionLabel = cc.LabelTTF.create("1 + 1", "Arial", 50 * 2);
        expressionLabel.attr({
            x: 71 * 2,
            y: - 13 * 2,
            anchorX: 0,
            anchorY : - 1.0,
            color : cc.color(255,255,255)
        });
        this.addChild(expressionLabel,1);
        this.setExpression("+",Math.floor(Math.random() * 10) + 1,Math.floor(Math.random() * 10) + 1);
    },
    setExpression:function(arithmetic, augend, addend) {
        expressionLabel.setString(augend + " " + arithmetic + " " + addend);
    }
});

var GameMainLayer = cc.Layer.extend({
    carSprite : null,
    answerLabel : null,
    levelLabel : null,
    levelDescLabel : null,
    goldCoinLabel : null,
    silverCoinLabel : null,
    copperConinLabel : null,
    ctor:function (){
        this._super();
        var image_levelguage_top = makeImage(res.image_levelguage_top, 1147, 432);
        this.addChild(image_levelguage_top, 1);

        for (var i = 1; i <= 8; i++) {
            var image_levelguage_center = makeImage(res.image_levelguage_center, 1147, 432 + (32 * i));
            this.addChild(image_levelguage_center, 1);
        };

        var image_levelguage_below = makeImage(res.image_levelguage_below, 1147, 432 + (32 * 9));
        this.addChild(image_levelguage_below, 1);

        var image_combo_1 = makeImage(res.image_combo_1, 30, 429 + (26 * 9));
        this.addChild(image_combo_1, 1);

        var image_combo_5 = makeImage(res.image_combo_5, 30, 429 + (26 * 10));
        this.addChild(image_combo_5, 1);

        var image_combo_10 = makeImage(res.image_combo_10, 30, 429 + (26 * 11));
        this.addChild(image_combo_10, 1);

        levelLabel = makeLabel("LEVEL 10", 21, 170, 22, cc.color(255,255,255));
        this.addChild(levelLabel, 1);

        levelDescLabel = makeLabel("합피감수 10인 덧,뺄셈", 40, 157, 60, cc.color(74,39,8));
        this.addChild(levelDescLabel, 1);

        goldCoinLabel = makeLabel("00", 39, (515 + 119), 43, cc.color(103,66,70));
        this.addChild(goldCoinLabel, 1);

        silverCoinLabel = makeLabel("00", 39, (515 + 276), 43, cc.color(103,66,70));
        this.addChild(silverCoinLabel, 1);

        copperCoinLabel = makeLabel("00", 39, (515 + 432), 43, cc.color(103,66,70));
        this.addChild(copperCoinLabel, 1);

        answerLabel = makeLabel("0", 40, 217 + 20 , 485 , cc.color(255,255,255));
        this.addChild(answerLabel, 1);

        this.createCar();

        return true;
    },
    createCar : function() {
        carSprite = new CarSprite(res.image_car,-700,size.height - (202 * 2));
        this.addChild(carSprite, 1);

        var actionBy = cc.MoveBy.create(10, cc.p(size.width+700, 0));

        carSprite.runAction(cc.sequence(actionBy, cc.callFunc(this.onCarMoveEnded, this)));
    },
    removeCar : function() {
        this.removeChild(carSprite);
        carSprite = null;
    },
    setAnswerLabel : function(newLabel) {
        answerLabel.setString(newLabel);
    },
    getAnswerLabel : function() {
        return answerLabel.getString();
    },
    onCarMoveEnded : function(sender) {
        console.log("car move ended!");
        this.removeCar();
        this.createCar();
    }
});
var InputLayer = cc.Layer.extend({
    ctor:function (){
        this._super();

        var homeItem = makeMenuItem(res.btn_home_normal,res.btn_home_highlighted,this.onHomeClicked,this,20,-17,101);
        var userMNItem = makeMenuItem(res.btn_usermn_normal,res.btn_usermn_highlighted,this.onUserNMClicked,this,1074,-37,102);

        var userNameLabel = makeLabel("김재능", 25, (1074 + 56) , 53 , cc.color(49,49,49));
        this.addChild(userNameLabel, 2);

        var upperMenu = cc.Menu.create(homeItem,userMNItem);
        upperMenu.x = 0;
        upperMenu.y = size.height;
        this.addChild(upperMenu, 2);


        var btnNormalImage = [res.btn_1_normal,res.btn_2_normal,res.btn_3_normal,res.btn_4_normal,res.btn_5_normal,res.btn_6_normal,res.btn_7_normal,res.btn_8_normal,res.btn_9_normal,res.btn_0_normal];
        var btnSelectedImage = [res.btn_1_highlighted,res.btn_2_highlighted,res.btn_3_highlighted,res.btn_4_highlighted,res.btn_5_highlighted,res.btn_6_highlighted,res.btn_7_highlighted,res.btn_8_highlighted,res.btn_9_highlighted,res.btn_0_highlighted];
        var menuItems = new Array(12);
        for (var i = 0; i <= 9; i++) {
            menuItems[i] = makeMenuItem(btnNormalImage[i],btnSelectedImage[i],this.onNumKeyClicked, this,143 * (i%5), (i >= 5) ? -110 : 0, i+1);
        };
        menuItems[10] = makeMenuItem(res.btn_back_normal,res.btn_back_highlighted,this.onBackKeyClicked,this,143 * 5,0,1001);
        menuItems[11] = makeMenuItem(res.btn_enter_normal,res.btn_enter_highlighted,this.onEnterKeyClicked,this,143 * 5,-110,1002);

        var numMenu = cc.Menu.create(menuItems);
        numMenu.x = 217 *2;
        numMenu.y = size.height - (560 * 2);
        this.addChild(numMenu, 2);

        return true;
    },
    onNumKeyClicked:function (sender) {
        var numKey = sender.tag % 10;
        var prevAnswer = gameMainLayer.getAnswerLabel();
        if (prevAnswer === '0') {
            gameMainLayer.setAnswerLabel(numKey);
        }
        else {
            gameMainLayer.setAnswerLabel(prevAnswer+numKey);
        }
       
    },
    onBackKeyClicked:function (sender) {
        gameMainLayer.setAnswerLabel("0");
    },
    onEnterKeyClicked:function (sender) {
        console.log(gameMainLayer.getAnswerLabel());
    },
    onUserNMClicked:function (sender) {
    },
    onHomeClicked:function (sender) {
    }
});
var BGLayer = cc.Layer.extend({
    ctor:function (){
        this._super();

        var image_bg = makeImage(res.image_bg, 0, 0);
        this.addChild(image_bg, 0);

        var image_conTop_bg = makeImage(res.image_conTop_bg, 0, 0);
        this.addChild(image_conTop_bg, 0);

        var image_combo_bg = makeImage(res.image_combo_bg, 20, 421);
        this.addChild(image_combo_bg, 0);

        var image_answerboard = makeImage(res.image_answerboard, 187, 421);
        this.addChild(image_answerboard, 0);

        var userNameLabel = makeLabel("지나가는 문제의 답을 입력하세요", 25, (187 + 35) , 440 , cc.color(113,78,47));
        this.addChild(userNameLabel, 1);

        var image_answerboard_textbar = makeImage(res.image_answerboard_textbar, 217, 481);
        this.addChild(image_answerboard_textbar, 0);

        var image_levelguage_bg = makeImage(res.image_levelguage_bg, 1136, 421);
        this.addChild(image_levelguage_bg, 0);

        var image_conTop_level = makeImage(res.image_conTop_level, 154, 19);
        this.addChild(image_conTop_level, 0);

        var image_conTop_coinbar = makeImage(res.image_conTop_coinbar, 515, 20);
        this.addChild(image_conTop_coinbar, 0);

        return true;
    }
});

var gameMainLayer;

var GameMainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        size = cc.director.getWinSize();

        var bgLayer= new BGLayer();
        this.addChild(bgLayer);

        gameMainLayer = new GameMainLayer();
        this.addChild(gameMainLayer);
        
        var inputLayer = new InputLayer();
        this.addChild(inputLayer);
        
    }
});