var GameMainLayer = cc.Layer.extend({
    ctor:function (){
        var size = cc.director.getWinSize();
        this._super();

        var image_car = cc.Sprite.create(res.image_car);
        image_car.attr({
            x: 282 * 2,
            y: size.height - (202 * 2),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_car, 1);

        var image_levelguage_top = cc.Sprite.create(res.image_levelguage_top);
        image_levelguage_top.attr({
            x: 1147 * 2,
            y: size.height - (432 * 2),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_levelguage_top, 1);

        for (var i = 1; i <= 8; i++) {
            var image_levelguage_center = cc.Sprite.create(res.image_levelguage_center);
            image_levelguage_center.attr({
                x: 1147 * 2,
                y: size.height - (432 * 2) - 64 * i,
                anchorX: 0,
                anchorY : 1.0
            });
            this.addChild(image_levelguage_center, 1);
        };

        var image_levelguage_below = cc.Sprite.create(res.image_levelguage_below);
        image_levelguage_below.attr({
            x: 1147 * 2,
            y: size.height - (432 * 2) - 64*9,
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_levelguage_below, 1);

        var image_combo_1 = cc.Sprite.create(res.image_combo_1);
        image_combo_1.attr({
            x: 30 * 2,
            y: size.height - (429 * 2) - (52 * 9),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_combo_1, 1);

        var image_combo_5 = cc.Sprite.create(res.image_combo_5);
        image_combo_5.attr({
            x: 30 * 2,
            y: size.height - (429 * 2) - (52 * 10),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_combo_5, 1);

        var image_combo_10 = cc.Sprite.create(res.image_combo_10);
        image_combo_10.attr({
            x: 30 * 2,
            y: size.height - (429 * 2) - (52 * 11),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_combo_10, 1);

        return true;
    }
});
var InputLayer = cc.Layer.extend({
    ctor:function (){
        var size = cc.director.getWinSize();
        this._super();

        var homeItem = cc.MenuItemImage.create(
            res.btn_home_normal,
            res.btn_home_highlighted,
            null,
            this.onMenuCallback,
            this);
        homeItem.attr({
            x: 20 * 2,
            y: size.height - (17 * 2),
            anchorX: 0,
            anchorY: 1.0
        });

        var userMNItem = cc.MenuItemImage.create(
            res.btn_usermn_normal,
            res.btn_usermn_highlighted,
            null,
            this.onMenuCallback,
            this);
        userMNItem.attr({
            x: 1074 * 2,
            y: size.height - (37 * 2),
            anchorX: 0,
            anchorY: 1.0
        });

        var upperMenu = cc.Menu.create(homeItem,userMNItem);
        upperMenu.x = 0;
        upperMenu.y = 0;
        this.addChild(upperMenu, 2);


        var menuItem1 = cc.MenuItemImage.create(
            res.btn_1_normal,
            res.btn_1_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem1.attr({
            x: 143 * 0 * 2,
            y: 0,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItem2 = cc.MenuItemImage.create(
            res.btn_2_normal,
            res.btn_2_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem2.attr({
            x: 143 * 1 * 2,
            y: 0,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItem3 = cc.MenuItemImage.create(
            res.btn_3_normal,
            res.btn_3_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem3.attr({
            x: 143 * 2 * 2,
            y: 0,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItem4 = cc.MenuItemImage.create(
            res.btn_4_normal,
            res.btn_4_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem4.attr({
            x: 143 * 3 * 2,
            y: 0,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItem5 = cc.MenuItemImage.create(
            res.btn_5_normal,
            res.btn_5_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem5.attr({
            x: 143 * 4 * 2,
            y: 0,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItemBack = cc.MenuItemImage.create(
            res.btn_back_normal,
            res.btn_back_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItemBack.attr({
            x: 143 * 5 * 2,
            y: 0,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItem6 = cc.MenuItemImage.create(
            res.btn_6_normal,
            res.btn_6_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem6.attr({
            x: 143 * 0 * 2,
            y: -110 * 2,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItem7 = cc.MenuItemImage.create(
            res.btn_7_normal,
            res.btn_7_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem7.attr({
            x: 143 * 1 * 2,
            y: -110 * 2,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItem8 = cc.MenuItemImage.create(
            res.btn_8_normal,
            res.btn_8_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem8.attr({
            x: 143 * 2 * 2,
            y: -110 * 2,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItem9 = cc.MenuItemImage.create(
            res.btn_9_normal,
            res.btn_9_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem9.attr({
            x: 143 * 3 * 2,
            y: -110 * 2,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItem0 = cc.MenuItemImage.create(
            res.btn_0_normal,
            res.btn_0_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItem0.attr({
            x: 143 * 4 * 2,
            y: -110 * 2,
            anchorX: 0,
            anchorY: 1.0
        });

        var menuItemEnter = cc.MenuItemImage.create(
            res.btn_enter_normal,
            res.btn_enter_highlighted,
            null,
            this.onMenuCallback,
            this);
        menuItemEnter.attr({
            x: 143 * 5 * 2,
            y: -110 * 2,
            anchorX: 0,
            anchorY: 1.0
        });

        var numMenu = cc.Menu.create(menuItem1,menuItem2,menuItem3,menuItem4,menuItem5,menuItem6,menuItem7,menuItem8,menuItem9,menuItem0,menuItemBack,menuItemEnter);
        numMenu.x = 217 *2;
        numMenu.y = size.height - (560 * 2);
        this.addChild(numMenu, 2);

        return true;
    },
    onMenuCallback:function (sender) {
       console.log("clicked");
    }
});
var BGLayer = cc.Layer.extend({
    ctor:function (){
        var size = cc.director.getWinSize();
        this._super();

        var image_bg = cc.Sprite.create(res.image_bg);
        image_bg.attr({
            x: 0,
            y: size.height,
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_bg, 0);

        var image_conTop_bg = cc.Sprite.create(res.image_conTop_bg);
        image_conTop_bg.attr({
            x: 0,
            y: size.height,
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_conTop_bg, 0);

        var image_combo_bg = cc.Sprite.create(res.image_combo_bg);
        image_combo_bg.attr({
            x: 20 * 2,
            y: size.height - (421 * 2),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_combo_bg, 0);

        var image_answerboard = cc.Sprite.create(res.image_answerboard);
        image_answerboard.attr({
            x: 187 * 2,
            y: size.height - (421 * 2),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_answerboard, 0);

        var image_answerboard_textbar = cc.Sprite.create(res.image_answerboard_textbar);
        image_answerboard_textbar.attr({
            x: 217 * 2,
            y: size.height - (481 * 2),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_answerboard_textbar, 0);

        var image_levelguage_bg = cc.Sprite.create(res.image_levelguage_bg);
        image_levelguage_bg.attr({
            x: 1136 * 2,
            y: size.height - (421 * 2),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_levelguage_bg, 0);

        var image_conTop_level = cc.Sprite.create(res.image_conTop_level);
        image_conTop_level.attr({
            x: 154 * 2,
            y: size.height - (19 * 2),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_conTop_level, 0);

        var image_conTop_coinbar = cc.Sprite.create(res.image_conTop_coinbar);
        image_conTop_coinbar.attr({
            x: 515 * 2,
            y: size.height - (20 * 2),
            anchorX: 0,
            anchorY : 1.0
        });
        this.addChild(image_conTop_coinbar, 0);

        return true;
    }
});

var GameMainScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var bgLayer = new BGLayer();
        this.addChild(bgLayer);

        var gameMainLayer = new GameMainLayer();
        this.addChild(gameMainLayer);
        
        var inputLayer = new InputLayer();
        this.addChild(inputLayer);
        
    }
});

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = cc.Menu.create(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(2, 1, 1);

        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
        helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

