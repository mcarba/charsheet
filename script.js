ko.options.deferUpdates = true;

var vm = {
    strMod: ko.observable(0),
    dexMod: ko.observable(+0),
    conMod: ko.observable(+0),
    intMod: ko.observable(+0),
    wisMod: ko.observable(+0),
    chaMod: ko.observable(+0),
    profMod: ko.observable(+0),
    acrProf: ko.observable(false),
    aniProf: ko.observable(false),
    arcProf: ko.observable(false),
    athProf: ko.observable(false),
    decProf: ko.observable(false),
    hisProf: ko.observable(false),
    insProf: ko.observable(false),
    intProf: ko.observable(false),
    invProf: ko.observable(false),
    medProf: ko.observable(false),
    natProf: ko.observable(false),
    percProf: ko.observable(false),
    perfProf: ko.observable(false),
    persProf: ko.observable(false),
    relProf: ko.observable(false),
    sleProf: ko.observable(false),
    steProf: ko.observable(false),
    surProf: ko.observable(false),
    rollLog: ko.observable(""),
    name: ko.observable(""),
    webhook: ko.observable(""),
    ac:ko.observable("")

}
vm.getAtrMod = function (params) {
    switch (params) {
        case "Str":
            return vm.strMod()
        case "Dex":
            return vm.dexMod()
        case "Con":
            return vm.conMod()
        case "Int":
            return vm.intMod()
        case "Wis":
            return vm.wisMod()
        case "Cha":
            return vm.chaMod()

        default:
            return 0

    }
}
var SavingThrow=function(name='',isProf=false,mod='') {
    this.mod=ko.observable(mod)
    this.isProf=ko.observable(isProf)
    this.name=ko.observable(name)
    this.value=ko.computed(()=>{
        return parseInt(vm.getAtrMod(mod))+(this.isProf() ?parseInt(vm.profMod()):0)
    })
    this.rollSave=function(){
        roll([[1,20]],this.value())
    }
}
vm.savingThrows=ko.observableArray([
    new SavingThrow('S',false,'Str'),
    new SavingThrow('D',false,'Dex'),
    new SavingThrow('C',false,'Con'),
    new SavingThrow('I',false,'Int'),
    new SavingThrow('W',false,'Wis'),
    new SavingThrow('C',false,'Cha'),

])

vm.hpCurrent = ko.observable()
vm.hpMaximum = ko.observable()
vm.notes = ko.observable()
vm.otherStuff = ko.observable()
vm.inventory = ko.observable("")
vm.acrSkill = ko.computed(() => {
    return parseInt(vm.dexMod()) + parseInt(vm.acrProf() ? vm.profMod() : 0)
})
vm.aniSkill = ko.computed(() => {
    return parseInt(vm.wisMod()) + parseInt(vm.aniProf() ? vm.profMod() : 0)
})
vm.arcSkill = ko.computed(() => {
    return parseInt(vm.intMod()) + parseInt(vm.arcProf() ? vm.profMod() : 0)
})
vm.athSkill = ko.computed(() => {
    return parseInt(vm.strMod()) + parseInt(vm.athProf() ? vm.profMod() : 0)
})
vm.decSkill = ko.computed(() => {
    return parseInt(vm.chaMod()) + parseInt(vm.decProf() ? vm.profMod() : 0)
})
vm.hisSkill = ko.computed(() => {
    return parseInt(vm.intMod()) + parseInt(vm.hisProf() ? vm.profMod() : 0)
})
vm.insSkill = ko.computed(() => {
    return parseInt(vm.wisMod()) + parseInt(vm.insProf() ? vm.profMod() : 0)
})
vm.intSkill = ko.computed(() => {
    return parseInt(vm.chaMod()) + parseInt(vm.intProf() ? vm.profMod() : 0)
})
vm.invSkill = ko.computed(() => {
    return parseInt(vm.intMod()) + parseInt(vm.invProf() ? vm.profMod() : 0)
})
vm.medSkill = ko.computed(() => {
    return parseInt(vm.wisMod()) + parseInt(vm.medProf() ? vm.profMod() : 0)
})
vm.natSkill = ko.computed(() => {
    return parseInt(vm.intMod()) + parseInt(vm.natProf() ? vm.profMod() : 0)
})
vm.percSkill = ko.computed(() => {
    return parseInt(vm.wisMod()) + parseInt(vm.percProf() ? vm.profMod() : 0)
})
vm.perfSkill = ko.computed(() => {
    return parseInt(vm.chaMod()) + parseInt(vm.perfProf() ? vm.profMod() : 0)
})
vm.persSkill = ko.computed(() => {
    return parseInt(vm.chaMod()) + parseInt(vm.persProf() ? vm.profMod() : 0)
})
vm.relSkill = ko.computed(() => {
    return parseInt(vm.intMod()) + parseInt(vm.relProf() ? vm.profMod() : 0)
})
vm.sleSkill = ko.computed(() => {
    return parseInt(vm.dexMod()) + parseInt(vm.sleProf() ? vm.profMod() : 0)
})
vm.steSkill = ko.computed(() => {
    return parseInt(vm.dexMod()) + parseInt(vm.steProf() ? vm.profMod() : 0)
})
vm.surSkill = ko.computed(() => {
    return parseInt(vm.wisMod()) + parseInt(vm.surProf() ? vm.profMod() : 0)
})

var Dice = function (size, amount) {
    this.size = ko.observable(size)
    this.amount = ko.observable(amount)
}
vm.atrMods = ['', 'Str', "Dex", 'Con', 'Int', 'Wis', 'Cha']
var Attack = function (name = '', title = '', diceArray = [new Dice(1, 4)], attBonus = "Dex", damBonus = "0",isProf=false) {

    
    this.isProf=ko.observable(isProf)
    this.name = ko.observable(name)
    this.title = ko.observable(title)
    this.diceArray = ko.observableArray(diceArray)
    this.attMod = ko.observable(attBonus)
    this.attackBonus = ko.computed(() => {
        return parseInt(vm.getAtrMod(this.attMod()))+(this.isProf()?parseInt(vm.profMod()):0)
    })
    this.damMod = ko.observable(damBonus)
    this.damBonus = ko.computed(() => {
        return vm.getAtrMod(this.damMod())
    })
    this.diceArrayString = ko.computed(function () {
    
        let res = ""
        this.diceArray().forEach(d => { res += d.size() + 'd' + d.amount() + "+" })

        return res
    }, this)

    this.rolls = ko.computed(function () {
        var res = "hit:" + this.attackBonus() + ". damage:" + this.diceArrayString() + this.damBonus()
        return res
    }, this)
    this.rollDamage = function () {
        roll(this.diceArray(), this.damBonus());
    }
    this.rollAttack = function () {
        roll([[1, 20]], this.attackBonus())
    }
    this.addDice = function (component) {
        component.diceArray.push(new Dice(0, 0))
    }
    this.removeDice = function (component) {
 
        component.diceArray.pop()
    }
    this.save = function (component) {
        vm.attacks.push(component)
    }
    this.edit = function (c) {
        popup(c)
    }
    this.removeSelf = function (c) {
        var l = vm.attacks.indexOf(c)
        if (l >= 0) {
            vm.attacks.splice(l, 1)
        }
    }
}

vm.attacks = ko.observableArray([

])

function loadFromStorage() {
    let s = JSON.parse(localStorage.getItem('userData'));
    if (!s){
        return
    }
    
    vm.strMod(s.strMod);
    vm.dexMod(s.dexMod);
    vm.conMod(s.conMod);
    vm.intMod(s.intMod);
    vm.wisMod(s.wisMod);
    vm.chaMod(s.chaMod);
    vm.profMod(s.profMod);
    vm.acrProf(s.acrProf);
    vm.aniProf(s.aniProf);
    vm.arcProf(s.arcProf);
    vm.athProf(s.athProf);
    vm.decProf(s.decProf);
    vm.hisProf(s.hisProf);
    vm.insProf(s.insProf);
    vm.intProf(s.intProf);
    vm.invProf(s.invProf);
    vm.medProf(s.medProf);
    vm.natProf(s.natProf);
    vm.percProf(s.percProf);
    vm.perfProf(s.perfProf);
    vm.persProf(s.persProf);
    vm.relProf(s.relProf);
    vm.sleProf(s.sleProf);
    vm.steProf(s.steProf);
    vm.surProf(s.surProf);
    vm.rollLog(s.rollLog);
    vm.inventory(s.inventory);
    vm.notes(s.notes);
    vm.otherStuff(s.otherStuff);
    vm.hpCurrent(s.hpCurrent);
    vm.hpMaximum(s.hpMaximum);
    vm.name(s.name);
    vm.ac(s.ac)
    vm.webhook(s.webhook)
    vm.attacks.removeAll();
    s.attacks.forEach(a => {
        let cotlet = [];
        a.diceArray.forEach(hleb => {
            cotlet.push(new Dice(hleb.size, hleb.amount));
        });
        vm.attacks.push(new Attack(a.name, a.title, cotlet, a.attMod, a.damMod));

    });
    vm.savingThrows.removeAll()
    s.savingThrows.forEach(a=>{
        vm.savingThrows.push(new SavingThrow(a.name,a.isProf,a.mod))
    })
}
function sendToDiscord(text="BeepBoop") {
    const data = {
        "username": vm.name(),
        "avatar_url": "",
        "content": text,
        "embeds": [],
        "components": []
    };

    fetch(vm.webhook(), {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    

}
function roll(diceArray, mod = -10000) {

    var log = ""
    var res = 0
    diceArray.forEach(d => {
      
        var s=d.size?d.size(): d[0]
        var a=d.amount?d.amount(): d[1]
        for (let index = 0; index < s; index++) {
            r = Math.floor(Math.random() * a + 1)
            res += r
            log += r + "+"
        }
    })
    if (mod != -10000) {
        res += parseInt(mod)
        log +="("+ mod+")"

    }
    else {
        log = log.substring(0, log.length - 1)

    }
    vm.rollLog(log + "=" + res + '\n' + vm.rollLog())
    var msg="I rolled:"
    diceArray.forEach(d => {
        msg+=(d.size?d.size(): d[0])+"d"+(d.amount?d.amount(): d[1])+" "
    })
    msg+=".\r\n I got: "+log+"="+res
    if (vm.webhook()!="")
    {
        sendToDiscord(msg)
    }

}

vm.popupAttack = ko.observable(new Attack())
var popup = function (attack) {
    this.attack = attack ? attack : new Attack('', '', [new Dice(1, 2)], 0, 0)
    vm.popupAttack(this.attack)
    

    document.querySelector("#popup").style.visibility = "visible"

}
window.addEventListener("load", () => {
    document.querySelector('#popup .close').addEventListener('click', (e) => {
        e.target.parentElement.style.visibility = 'hidden'
    })
    ko.applyBindings(vm)

    document.querySelectorAll("button.roll").forEach(e => e.addEventListener('click', (ev) => {
        roll([[1, 20]], parseInt(e.previousElementSibling.value))
    }))

    document.querySelectorAll("button.flatRoll").forEach(e => e.addEventListener('click', (ev) => {
        roll([[1, parseInt(e.dataset.size)]],)
    }))

    document.querySelector("button.clearRollLog").addEventListener('click', (e) => {
        vm.rollLog("")
    })
    document.querySelector(".attacks .header button").addEventListener('click', (e) => {
        popup()
        e.stopPropagation()
    })

    loadFromStorage();
    setInterval(() => {
        localStorage.setItem("userData", ko.toJSON(vm));
        //console.log('saved')
    }, 10000);

})


