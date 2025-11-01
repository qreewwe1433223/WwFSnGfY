// 代码生成时间: 2025-11-01 23:24:01
const THREE = require('three');
const { Vector3 } = THREE;

// AntiCheatSystem class
class AntiCheatSystem {
    constructor() {
        this.isCheatDetected = false;
        this.suspiciousActivity = [];
    }

    // Method to check for abnormal user movement
    checkUserMovement(userPosition, previousPosition) {
        if (!userPosition || !previousPosition) {
            console.error('Invalid input for user movement check');
            return;
        }

        const movementDifference = new Vector3()
            .subVectors(userPosition, previousPosition)
            .length();

        // Define a threshold for normal movement distance
        const movementThreshold = 100; // example threshold value

        if (movementDifference > movementThreshold) {
            this.suspiciousActivity.push({
                type: 'abnormal_movement',
                distance: movementDifference
            });
            this.isCheatDetected = true;
        }
    }

    // Method to check for abnormal user rotation
    checkUserRotation(userRotation, previousRotation) {
        if (!userRotation || !previousRotation) {
            console.error('Invalid input for user rotation check');
            return;
        }

        // Calculate the difference in rotation
        const rotationDifference = userRotation.clone().sub(previousRotation).length();

        // Define a threshold for normal rotation change
        const rotationThreshold = Math.PI / 2; // example threshold value

        if (rotationDifference > rotationThreshold) {
            this.suspiciousActivity.push({
                type: 'abnormal_rotation',
                change: rotationDifference
            });
            this.isCheatDetected = true;
        }
    }

    // Method to report cheat detection
    reportCheat() {
        if (this.isCheatDetected) {
            console.warn('Cheat detected:', this.suspiciousActivity);
            this.isCheatDetected = false;
            this.suspiciousActivity = [];
        }
    }
}

// Example usage
const antiCheatSystem = new AntiCheatSystem();

// Simulate user movement and rotation checks
const userPosition = new Vector3(0, 0, 0);
const previousPosition = new Vector3(50, 0, 0);
const userRotation = new Vector3(0, 0, 0);
const previousRotation = new Vector3(Math.PI, 0, 0);

antiCheatSystem.checkUserMovement(userPosition, previousPosition);
antiCheatSystem.checkUserRotation(userRotation, previousRotation);

// Report any detected cheats
antiCheatSystem.reportCheat();