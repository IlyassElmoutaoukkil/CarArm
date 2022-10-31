radio.onReceivedString(function (receivedString) {
    activeArm = !(activeArm)
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
                vRL = vRL + 3
                console.log(vRL)
            } else {
                vRL = vRL - 3
                console.log(vRL)
            }
            f = vRL
            SuperBit.Servo(SuperBit.enServo.S1, f)
        } else if (name == "side") {
            if (value < 0) {
                vUD = vUD + 3
            } else {
                vUD = vUD - 3
            }
            g = vUD
            SuperBit.Servo(SuperBit.enServo.S3, g)
        }
    }
})
radio.onReceivedNumber(function (onReceivedNumber) {
    armOpened = !(armOpened)
    if (armOpened) {
        SuperBit.Servo(SuperBit.enServo.S2, 180)
    } else {
        SuperBit.Servo(SuperBit.enServo.S2, 0)
    }
})
let armOpened = false
let g = 0
let f = 0
let activeArm = false
let vUD = 0
let vRL = 0
vRL = 90
vUD = 111
SuperBit.Servo(SuperBit.enServo.S2, 180)
SuperBit.Servo(SuperBit.enServo.S1, 0)
SuperBit.Servo(SuperBit.enServo.S3, 111)
function scale(num: any, inMin: any, inMax: any, outMin: any, outMax: any) {
    return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
radio.setGroup(3)
basic.forever(function () {
    SuperBit.MotorStopAll()
})
