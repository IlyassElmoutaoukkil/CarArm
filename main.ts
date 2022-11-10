radio.onReceivedString(function (receivedString) {
    activeArm = !(activeArm)
    if (activeArm) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        music.playMelody("C5 B A G F E D C ", 900)
    } else {
        music.playMelody("C D E F G A B C5 ", 900)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
})
radio.onReceivedValue(function (name, value) {
    if (!(activeArm)) {
        if (name == "front") {
            SuperBit.MotorRunDual(
            SuperBit.enMotors.M1,
            value,
            SuperBit.enMotors.M3,
            value
            )
            SuperBit.MotorRunDual(
            SuperBit.enMotors.M2,
            value,
            SuperBit.enMotors.M4,
            value
            )
        } else if (name == "side") {
            SuperBit.MotorRunDual(
            SuperBit.enMotors.M1,
            value,
            SuperBit.enMotors.M2,
            value
            )
            SuperBit.MotorRunDual(
            SuperBit.enMotors.M3,
            0 - value,
            SuperBit.enMotors.M4,
            0 - value
            )
        } else {
            SuperBit.MotorStopAll()
        }
    } else {
        if (name == "front") {
            if (value < 0) {
                if (vRL < 69) {
                    vRL = vRL + 3
                    vRLi = vRLi - 3
                } else {
                }
                console.log(vRL)
            } else {
                if (vRL > 0) {
                    vRL = vRL - 3
                    vRLi = vRLi + 3
                } else {
                }
                console.log(vRL+' vRL')
                console.log(vRLi+' vRLi')
            }
            SuperBit.Servo(SuperBit.enServo.S3, vRL)
            SuperBit.Servo(SuperBit.enServo.S1, vRLi)
        } else if (name == "side") {
            if (value < 0) {
                vUD = vUD + 3
            } else {
                vUD = vUD - 3
            }
            SuperBit.Servo(SuperBit.enServo.S4, vUD)
        }
    }
})
radio.onReceivedNumber(function (onReceivedNumber) {
    armOpened = !(armOpened)
    if (armOpened) {
        SuperBit.Servo(SuperBit.enServo.S2, 180)
        pins.digitalWritePin(DigitalPin.P3, 1)
        music.playMelody("- F F - - F F - ", 500)
    } else {
        SuperBit.Servo(SuperBit.enServo.S2, 0)
        pins.digitalWritePin(DigitalPin.P3, 0)
        music.playMelody("- F F - - F F - ", 500)
    }
})
let armOpened = false
let g = 0
let activeArm = false
let vUD = 0
let vRLi = 0
let vRL = 0
pins.digitalWritePin(DigitalPin.P2, 1)
music.playMelody("C5 - - C5 C5 - - C5 ", 500)
vRLi = 80
// vRL = 90
vUD = 111
SuperBit.Servo(SuperBit.enServo.S2, 180)
SuperBit.Servo(SuperBit.enServo.S1, vRL)
SuperBit.Servo(SuperBit.enServo.S3, vRLi)
function scale(num: any, inMin: any, inMax: any, outMin: any, outMax: any) {
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
radio.setGroup(3)
basic.forever(function () {
    SuperBit.MotorStopAll()
})
