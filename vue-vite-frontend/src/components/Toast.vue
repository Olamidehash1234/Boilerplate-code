<template>
    <div :class="['toast', type, position]" v-if="isVisible">
        <div class="toast-icon">
            <img :src="icon" alt="icon" />
        </div>
        <div class="toast-content">
            <strong>{{ text }}</strong>
            <p v-if="description">{{ description }}</p>
        </div>
        <button class="toast-close" @click="closeToast">&times;</button>
        <div class="toast-progress" :style="{ width: progressWidth + '%' }"></div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import error from "../assets/icons/toast/error.svg";
import warning from "../assets/icons/toast/warning.svg";
import info from "../assets/icons/toast/info.svg";
import success from "../assets/icons/toast/success.svg";

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'info', // Can be 'error', 'warning', 'success', 'info'
    },
    position: {
        type: String,
        default: 'top-right', // Can be 'top-left', 'top-right', 'bottom-left', 'bottom-right'
    },
    duration: {
        type: Number,
        default: 5000, // 5 seconds default
    },
});

const isVisible = ref(true);
const progressWidth = ref(100);
let timer;
let startTime;
let remainingTime = props.duration;
let interval;

// Set icon based on the type
const icon = computed(() => {
    switch (props.type) {
        case 'error':
            return error; // Replace with your actual icon paths
        case 'warning':
            return warning;
        case 'success':
            return success;
        case 'info':
        default:
            return info;
    }
});

// Close the toast
const closeToast = () => {
    clearInterval(interval);
    isVisible.value = false;
};

// Start the timer for auto-closing
const startTimer = () => {
    startTime = Date.now();
    interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        remainingTime = props.duration - elapsedTime;
        progressWidth.value = (remainingTime / props.duration) * 100;

        if (remainingTime <= 0) {
            clearInterval(interval);
            closeToast();
        }
    }, 100);
};

// Pause and resume on hover
const pauseTimer = () => {
    clearInterval(interval);
    props.duration = remainingTime;
};

const resumeTimer = () => {
    startTimer();
};

// Watch for visibility and stop timer on close
watch(isVisible, (val) => {
    if (!val) clearInterval(interval);
});

onMounted(() => {
    startTimer();
});
</script>

<style scoped>
.toast {
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    color: black;
    position: fixed;
    max-width: 400px;
    z-index: 1000;
    cursor: pointer;
    overflow: hidden;
}

@media (max-width: 1000px) {
    .toast {
        max-width: 300px;
    }
}

.toast-icon {
    margin-right: 15px;
}

.toast-icon img {
    height: 24px;
    object-fit: cover;
    width: 24px;
}

.toast-content {
    flex: 1;
}

.toast-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 10px;
}

.toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    background-color: rgba(0, 0, 0, 0.2);
    transition: width 0.1s linear;
}

/* Position classes */
.top-right {
    top: 20px;
    right: 20px;
}

.top-left {
    top: 20px;
    left: 20px;
}

.bottom-right {
    bottom: 20px;
    right: 20px;
}

.bottom-left {
    bottom: 20px;
    left: 20px;
}

/* Type classes */
.info {
    background-color: #d9f7ff;
    /* light blue */
}

.error {
    background-color: #ffccd5;
    /* light red */
}

.warning {
    background-color: #ffeeba;
    /* light orange */
}

.success {
    background-color: #d4edda;
    /* light green */
}
</style>