//V18
//Coordinates
//Item system

console.log("Welcome to Terminus.JS");

hints();
function hints(force = 0) {
    const list = [
        "You can generate points by calling update().",
        "Power mult = power / 10",
        "help() can update its contents based on the things you have purchased.",
        "You can change your difficulty by calling difficultyset(number)",
        "You can get more hints by calling hints().",
    ];
    console.log(list[Math.floor(Math.random() * list.length)]);
}

function github() {
    return "https://github.com/rando-idiot/Terminus.JS";
}

function credits() {
    [
        "Developer: @rando.idiot on discord.",
        "Major contributor: @.bleb1k on discord.",
        "Check us out!",
    ].forEach((str) => console.log(str));
}

function discord() {
    [
        "You can find me and other people who either hate this game or enjoy it here:",
        "Discord.gg/kYyEQ2hjPs",
    ].forEach((str) => console.log(str));
}

const DEBUG_MODE = false;

//The object for determining how many points you make from any given update.
let game = events({
    unlocks: events({
        begin: false,
        index: false,
        doctype: false,
        configyml: false,
        infshop: false,
    }),
    infstage: 0,
    points: 0,
    steponeadd: 0,
    steptwomult: 1,
    stepthreemult: 1,
    stepfouradd: 1,
    basegain: 1,
    upgradebonus: 1,
    upgpriceboost: 0,
    upgstage: 0,
    updateloop: 1,
    power: 10,
    powerpoints: 1, //Hahah PP
    indebted: 1,
    difficulty: 1,
    maxbattery: 15,
    rechargerate: 1,
    antipower: 10,
    itemduration: 0,
    pointcalc: () => {
        game.points = game.points +
            (game.basegain +
                    game.steponeadd * game.steptwomult *
                        game.stepthreemult +
                    game.stepfouradd * game.powerpoints) /
                game.difficulty;
        if (game.itemduration > 0) {
            game.itemduration = game.itemduration - 1;
            game.points = game.points * game.itemmult;
        }
    },
});

game.points$onChange((points) => {
    console.log(`You have ${points} points.`);
    if (points < 0) {
        game.indebted = true;
    } else if (game.indebted) {
        game.indebted = false;
    }
});
game.indebted$on(true, () => {
    console.log("You are in debt.");
});
game.indebted$on(false, () => {
    console.log("You got out of debt.");
});

//Used for determining the position of the player. Called in the case of item collecting.
let playerpositiondata = {
    playerx: 0,
    playery: 0,
    playerz: 0,
};
let itemkey = {
    helditem: 0,
    totalitems: 3,
    itemid0: {
        name: "N/A",
        description: "This is not an item",
    },
    itemid1: {
        name: "Battery",
        description: "Refills battery",
    },
    itemid2: {
        name: "Get Rich Quick!",
        description: "Gain 2 updates worth of points",
    },
    itemid3: {
        name: "MultBox",
        description: "Gain *2 points per update() for 3 updates()",
    },
};
let itemposition = {
    itemx: randomnumbah(-100, 100),
    itemy: randomnumbah(-100, 100),
    itemz: randomnumbah(-100, 100),
    itemtype: randomnumbah(1, itemkey.totalitems),
};
function randomnumbah(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function useheld() {
    if (itemkey.helditem === 0) {
        console.log("You aren't holding anything.");
    } else if (itemkey.helditem === 1) {
        console.log("Used ", itemkey.itemid1.name);
        game.power = game.maxbattery;
    } else if (itemkey.helditem === 2) {
        console.log("Used ", itemkey.itemid2.name);
        game.pointcalc();
    } else if (itemkey.helditem === 3) {
        console.log("Used ", itemkey.itemid3.name);
        game.itemduration = 3;
        game.itemmult = 2;
    }
}
function roam() { //I realize now this is probably the longest function in the program. lol. (also this is probably excruciatingly hard to read and inefficient so im sorry if you're reading this (yes ))
    xroam = randomnumbah(1, 3);
    yroam = randomnumbah(1, 3);
    zroam = randomnumbah(1, 3);

    //roam function on the x axis.
    if (xroam == 1) {
        playerpositiondata.playerx = playerpositiondata.playerx - 1;
        if (playerpositiondata.playerx === -100) {
            return "Wall hit.";
        }
        if (playerpositiondata.playerx === 100) {
            return "Wall hit.";
        }
    }
    if (xroam == 2) {
        playerpositiondata.playerx = playerpositiondata.playerx - 0;
        if (playerpositiondata.playerx === -100) {
            return "Wall hit.";
        }
        if (playerpositiondata.playerx === 100) {
            return "Wall hit.";
        }
    }
    if (xroam == 3) {
        playerpositiondata.playerx = playerpositiondata.playerx + 1;
        if (playerpositiondata.playerx === -100) {
            return "Wall hit.";
        }
        if (playerpositiondata.playerx === 100) {
            return "Wall hit.";
        }
    }

    //roam function on the y axis
    if (yroam == 1) {
        playerpositiondata.playery = playerpositiondata.playery - 1;
        if (playerpositiondata.playery === -100) {
            return "Wall hit.";
        }
        if (playerpositiondata.playery === 100) {
            return "Wall hit.";
        }
    }
    if (yroam == 2) {
        playerpositiondata.playery = playerpositiondata.playery - 0;
        if (playerpositiondata.playery === -100) {
            return "Wall hit.";
        }
        if (playerpositiondata.playery === 100) {
            return "Wall hit.";
        }
    }
    if (yroam == 3) {
        playerpositiondata.playery = playerpositiondata.playery - -1;
        if (playerpositiondata.playery === -100) {
            return "Wall hit.";
        }
        if (playerpositiondata.playery === 100) {
            return "Wall hit.";
        }
    }
    //roam function on the z axis
    if (zroam == 1) {
        playerpositiondata.playerz = playerpositiondata.playerz - 1;
        if (playerpositiondata.playerz === -100) {
            return "Wall hit.";
        }
        if (playerpositiondata.playerz === 100) {
            return "Wall hit.";
        }
    }
    if (zroam == 2) {
        playerpositiondata.playerz = playerpositiondata.playerz - 0;
        if (playerpositiondata.playerz === -100) {
            return "Wall hit.";
        }
        if (playerpositiondata.playerz === 100) {
            return "Wall hit.";
        }
    }
    if (yroam == 3) {
        playerpositiondata.playerz = playerpositiondata.playerz - -1;
        if (playerpositiondata.playerz === -100) {
            return "Wall hit.";
        }
        if (playerpositiondata.playerz === 100) {
            return "Wall hit.";
        }
    }

    if (itemposition.itemx === playerpositiondata.playerx) {
        if (itemposition.itemy === playerpositiondata.playery) {
            if (itemposition.itemz === playerpositiondata.playerz) {
                itemkey.helditem = itemposition.itemtype;
                if (itemkey.helditem === 1) {
                    console.log("You got:");
                    console.log(itemkey.itemid1.name);
                    console.log(itemkey.itemid1.description);
                } else if (itemkey.helditem === 2) {
                    console.log("You got:");
                    console.log(itemkey.itemid2.name);
                    console.log(itemkey.itemid2.description);
                } else if (itemkey.helditem === 3) {
                    console.log("You got:");
                    console.log(itemkey.itemid3.name);
                    console.log(itemkey.itemid3.description);
                }
            }
        }
    }
    console.log(
        "Current pos:",
        "X:",
        playerpositiondata.playerx,
        " Y:",
        playerpositiondata.playery,
        " Z:",
        playerpositiondata.playerz,
    );
}

function pointsset(set) {
    if (DEBUG_MODE) {
        game.points = set;
    } else {
        console.log("Nice try.");
    }
}

function help() {
    const list = [
        "help()................Shows this.",
        "shop()................Shows the available purchasable items.",
        "update()..............Increases points. Equivalent of clicking in a clicker game.",
        "charge()..............Gain power.",
        "difficultyset(number).Change your difficulty.",
        "github()..............Shows the github repo link.",
        "credits().............Shows the credits.",
        "discord().............Gives a link to the terminus.js discord.",
        "hints()...............Shows a hint.",
        "checkAchievements()...Shows your current achievements.",
    ];
    if (game.unlocks.infshop) {
        list.push("infshop().............Shows infinitley purchasable items.");
    }
    if (DEBUG_MODE) list.push("pointsset(set)....Sets your points.");
    list.forEach((str) => console.log(str));
}
help();

function difficultyset(number) {
    game.difficulty = number;
    console.log(`Set difficulty to ${number}`);
    console.log(
        "Can be changed at any time, but you wouldn't do that, would you?",
    ); // why is this there?
}

game.power$onChange((power) => {
    if (game.power == game.maxbattery) {
        return console.log("Full charge.");
    }
    console.log("Current battery: ", game.power);
});
function charge() {
    if (game.power < game.maxbattery) {
        game.power = game.power + game.rechargerate;
    }
}

function update() {
    if (game.power <= 0) return console.log("No power.");
    game.powerpoints = game.power / game.antipower;
    game.power -= 1;

    game.pointcalc();

    checkAchievements();
}

function shop() {
    [
        "begin(): $5.........The beginning",
        "index(): $20........index.html",
        "doctype(): $50......<!DOCTYPE HTML>",
        "configyml(): $100...config.yml",
        game.upgstage === 0
            ? "push(): $500........git push 1"
            : game.upgstage === 1
            ? "push(): $5000.......git push 2"
            : game.upgstage === 2
            ? "push(): $50000......git push 3"
            : "push(): $???........git push ?",
    ].forEach((str) => console.log(str));
}

game.unlocks.begin$on(true, () => {
    game.basegain = 10;
    game.points -= 5 * game.difficulty;
    console.log("Began!\n");
});
function begin() {
    if (game.indebted) return console.log("Cannot afford!");
    game.unlocks.begin = true;
    globalThis.begin = () => console.log("You already began.");
}

game.unlocks.index$on(true, () => {
    game.steptwomult += 0.5;
    game.points -= 20 * game.difficulty;
    console.log("Created index.html!\n");
});
function index() {
    if (game.indebted) return console.log("Cannot afford!");
    game.unlocks.index = true;
    globalThis.index = () => console.log("You already created index.html");
}

game.unlocks.doctype$on(true, () => {
    game.stepthreemult += 0.5;
    game.points -= 50 * game.difficulty;
    console.log("Added <!DOCTYPE HTML>!\n");
});
function doctype() {
    if (game.indebted) return console.log("Cannot afford!");
    game.unlocks.doctype = true;
    globalThis.doctype = () =>
        console.log(
            "You- YOU ALREADY ADDED <!DOCTYPE HTML> YOU DONT NEED TO PUT IT EVERY TIME YOU ADD <BODY> STOP PLEASE",
        );
}

game.unlocks.configyml$on(true, () => {
    game.stepfourmult *= 2;
    game.points -= 100 * game.difficulty;
    console.log("Created config.yml!");
});
function configyml() {
    if (game.indebted) return console.log("Cannot afford!");
    game.unlocks.configyml = true;
    globalThis.configyml = () => console.log("You already created config.yml");
}

game.upgstage$on(1, () => {
    globalThis.push = () => {
        if (game.indebted) return "Come back when you're a little bit richer";

        game.upgstage = 2;
        game.points -= 5000 * game.difficulty;
    };
});
game.upgstage$on(2, () => {
    globalThis.push = function () {
        if (game.indebted) return "Come back when you're a little bit richer";

        game.upgstage = 3;
        game.points -= 50000 * game.difficulty;
        return `You have ${game.points} points`;
    };
});
game.upgstage$on(3, () => {
    globalThis.push3 = () =>
        console.log("Please don't try this again, it's not funny");
});
function push() {
    if (game.indebted) {
        return console.log("you are brokies :3");
    }

    game.unlocks.infshop = true;
    game.upgstage = 1;
    game.points -= 500 * game.difficulty;
}

game.unlocks.infshop$on(true, () => {
    console.log("You've unlocked the infshop. Check help() for details.");
    globalThis.infshop = function () {
        let list = game.upgstage === 1
            ? [ // todo: Export cost calculations
                `stepone(): $${
                    5 + game.upgpriceboost * game.difficulty
                }............Increases step 1 addition`,
                `steptwo(): $${
                    25 + game.upgpriceboost * game.difficulty
                }...........Increases step 2 multiplier`,
                `stepthree(): $${
                    25 + game.upgpriceboost * game.difficulty
                }.........Increases step 3 multiplier`,
                `stepfour(): $${
                    2 + game.upgpriceboost * game.difficulty
                }...........Increases step 4 addition`,
            ]
            : [
                `stepone(): $${
                    20 + game.upgpriceboost * game.difficulty
                }..........Increases step 1 addition`,
                `steptwo(): $${
                    100 + game.upgpriceboost * game.difficulty
                }.........Increases step 2 multiplier`,
                `stepthree(): $${
                    100 + game.upgpriceboost * game.difficulty
                }.......Increases step 3 multiplier`,
                `stepfour(): $${
                    8 + game.upgpriceboost * game.difficulty
                }..........Increases step 4 addition`,
                `maxpowerup(): $${
                    800 + game.upgpriceboost * game.difficulty
                }.......Increases the maximum battery.`,
            ];

        list = [
            `Stage ${game.upgstage} upgrades`,
            ...list,
            `baseup(): $${
                500 + game.upgpriceboost * game.difficulty
            }...........Increases the base that is then multiplied etc etc`,
            `upgbonus(): $${
                100 + game.upgpriceboost * game.difficulty
            }..........Increases how much upgrades upgrade stuff OTHER THAN ITSELF.`,
            `helloworld(): $0...........Prints 'Hello world!' in console.`,
        ];

        console.log("See code comments for upgrade descriptions"); // should this be here?

        console.log(list.join("\n"));
    };
});

function infshop() {
    console.log("You have not unlocked infinite upgrades.");
}

game.upgstage$on(1, () => {
    globalThis.stepone = function () {
        if (game.indebted) {
            return console.log("You don't have enough money");
        }

        game.points -= 5 + game.upgpriceboost * game.difficulty;
        game.steponeadd += game.upgradebonus;
        game.upgpriceboost += 1;

        console.log("purchased stepone();");
    };

    globalThis.steptwo = function () {
        if (game.indebted) return console.log("You don't have enough money");

        game.points -= 25 + game.upgpriceboost * game.difficulty;
        game.steptwomult += game.upgradebonus;
        game.upgpriceboost += 1;

        console.log("purchased steptwo();");
    };

    globalThis.stepthree = function () {
        if (game.indebted) return console.log("You don't have enough money");

        game.points -= 25 + game.upgpriceboost * game.difficulty;
        game.stepthreemult += game.upgradebonus;
        game.upgpriceboost += 1;

        console.log("purchased stepthree();");
    };

    globalThis.stepfour = function () {
        if (game.indebted) return console.log("You don't have enough money");

        game.points -= 2 + game.upgpriceboost * game.difficulty;
        game.stepfouradd += game.upgradebonus;
        game.upgpriceboost += 1;

        console.log("purchased stepfour();");
    };

    globalThis.baseup = function () {
        if (game.indebted) return console.log("You don't have enough money");

        game.points -= 500 + game.upgpriceboost * game.difficulty;
        game.basegain += game.upgradebonus;
        game.upgpriceboost += 1;

        console.log("purchased baseup();");
    };

    globalThis.upgbonus = function () {
        if (game.indebted) {
            return console.log("You don't have enough money");
        }

        game.points -= 100 + game.upgpriceboost * game.difficulty;
        game.upgradebonus += 0.1;
        game.upgpriceboost += 1;

        console.log("purchased upgradebonus();");
    };
});

game.upgstage$on(2, () => {
    globalThis.stepone = function () {
        if (game.indebted) {
            return console.log("You don't have enough money");
        }

        game.points -= 20 + game.upgpriceboost * game.difficulty;
        game.steponeadd += game.upgradebonus;
        game.upgpriceboost += 1;

        console.log("purchased stepone();");
    };

    globalThis.steptwo = function () {
        if (game.indebted) {
            return console.log("You don't have enough money");
        }

        game.points -= 100 + game.upgpriceboost * game.difficulty;
        game.steptwomult += game.upgradebonus;
        game.upgpriceboost += 1;

        console.log("purchased steptwo();");
    };

    globalThis.stepthree = function () {
        if (game.indebted) {
            return console.log("You don't have enough money");
        }

        game.points -= 100 + game.upgpriceboost * game.difficulty;
        game.stepthreemult += game.upgradebonus;
        game.upgpriceboost += 1;

        console.log("purchased stepthree();");
    };

    globalThis.stepfour = function () {
        if (game.indebted) {
            return console.log("You don't have enough money");
        }

        game.points -= 8 + game.upgpriceboost * game.difficulty;
        game.stepfouradd += game.upgradebonus;
        game.upgpriceboost += 1;

        console.log("purchased stepfour();");
    };
    globalThis.maxpowerup = function () {
        if (game.indebted) {
            return console.log("You don't have enough money");
        }

        game.points -= 800 + game.upgpriceboost * game.difficulty;
        game.stepfouradd += game.upgradebonus;
        game.maxbattery += 1;

        console.log("purchased maxpowerup();");
    };
});

game.upgstage$on(3, () => {
    globalThis.stepone2 =
        globalThis.steptwo2 =
        globalThis.stepthree2 =
        globalThis.stepfour2 =
            function () {
                return console.log("Lol you leveled up too much krill issue.");
            };
});

function stepone() {
    return console.log("You have not unlocked infinite upgrades.");
}
function steptwo() {
    return console.log("You have not unlocked infinite upgrades.");
}
function stepthree() {
    return console.log("You have not unlocked infinite upgrades.");
}
function stepfour() {
    return console.log("You have not unlocked infinite upgrades.");
}
function baseup() {
    return console.log("You have not unlocked infinite upgrades.");
}
function upgbonus() {
    return console.log("You have not unlocked infinite upgrades.");
}
function maxpowerup() {
    return console.log("You have not leveled up enough");
}

function helloworld() {
    console.log("Hello world!");
}

// STUPID FUCKING IDEA // NO IT'S NOT!
const achievements = [
    {
        name: "Well, it's a start.",
        description: "Earn your first point.",
        criteria: game.points$on(
            (p) => p >= 1,
            () => console.log("New Achievement: Well, it's a start."),
        ),
    },
    {
        name: "Broke ass",
        description: "Collect 100 points.",
        criteria: game.points$on(
            (p) => p >= 100,
            () => console.log("New Achievement: Broke ass"),
        ),
    },
    {
        name: "Full battery",
        description: "Reach full power.",
        criteria: game.power$on(
            (p) => p == game.maxbattery,
            () => console.log("New Achievement: Full battery"),
        ),
    },
    {
        name: "Overcharged",
        description: "Get a power value over the default maximum.",
        criteria: game.power$on(
            (p) => p > 15,
            () => console.log("New Achievement: Overcharged"),
        ),
    },
];

function checkAchievements() {
    achievements.forEach((achievement) => {
        if (!achievement.achieved && achievement.criteria()) {
            achievement.achieved = true;
            console.log(
                `You got: ${achievement.name} - ${achievement.description}`,
            );
        }
    });
}
