<template>
  <!-- Hidden form for Netlify to detect -->
  <form name="contact" netlify netlify-honeypot="bot-field" hidden>
    <input type="text" name="name" />
    <input type="text" name="phone" />
    <input type="email" name="email" />
    <textarea name="message"></textarea>
  </form>

  <!-- Form Dialog -->
  <v-dialog
    :model-value="modelValue && !sent"
    @update:modelValue="emit('update:modelValue', $event)"
    max-width="480px"
  >
    <v-card class="contact-form-card">
      <v-card-title class="form-title">Contact me</v-card-title>
      <v-card-subtitle class="form-subtitle">Send me a message, let's chat!</v-card-subtitle>

      <v-card-text>
        <v-form ref="formRef" v-model="formValid" @submit.prevent="handleSubmit">
          <input
            v-model="honeypot"
            type="text"
            name="bot-field"
            tabindex="-1"
            autocomplete="off"
            class="honeypot"
            aria-hidden="true"
          />

          <v-text-field
            v-model="form.name"
            label="Name *"
            variant="outlined"
            density="comfortable"
            :rules="nameRules"
            validate-on="blur"
            autocomplete="name"
            class="form-field"
          />

          <v-text-field
            v-model="form.email"
            label="Email *"
            type="email"
            variant="outlined"
            density="comfortable"
            :rules="emailRules"
            validate-on="blur"
            autocomplete="email"
            class="form-field"
          />

          <v-text-field
            v-model="form.phone"
            label="Phone (optional)"
            variant="outlined"
            density="comfortable"
            :rules="phoneRules"
            validate-on="blur"
            autocomplete="tel"
            class="form-field"
          />

          <v-textarea
            v-model="form.message"
            label="Message *"
            variant="outlined"
            density="comfortable"
            :rules="messageRules"
            rows="4"
            counter
            maxlength="2000"
            validate-on="blur"
            class="form-field"
          />
        </v-form>
      </v-card-text>

      <v-card-actions class="form-actions">
        <v-btn variant="text" @click="closeDialog">Cancel</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="flat"
          :disabled="!formValid || submitting"
          :loading="submitting"
          @click="handleSubmit"
        >
          Send
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Confirmation Dialog -->
  <v-dialog
    :model-value="modelValue && sent"
    @update:modelValue="emit('update:modelValue', $event)"
    max-width="400px"
  >
    <v-card>
      <v-card-text class="text-center success-dialog">
        <v-icon size="48" color="green">mdi-check-circle</v-icon>
        <p class="success-text">Your message was sent!</p>
        <v-btn class="mt-4" @click="closeDialog">OK</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const MIN_MESSAGE_LENGTH = 10
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const sent = ref(false)
const formValid = ref(false)
const submitting = ref(false)
const formRef = ref()
const honeypot = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const trimRequired = (value: string, field: string) =>
  !!value?.trim() || `${field} is required`

const nameRules = [
  (v: string) => trimRequired(v, 'Name'),
  (v: string) => v.trim().length >= 2 || 'Name must be at least 2 characters'
]

const emailRules = [
  (v: string) => trimRequired(v, 'Email'),
  (v: string) => EMAIL_PATTERN.test(v.trim()) || 'Enter a valid email address'
]

const phoneRules = [
  (v: string) =>
    !v?.trim() ||
    v.trim().length >= 7 ||
    'Enter a valid phone number or leave blank'
]

const messageRules = [
  (v: string) => trimRequired(v, 'Message'),
  (v: string) =>
    v.trim().length >= MIN_MESSAGE_LENGTH ||
    `Message must be at least ${MIN_MESSAGE_LENGTH} characters`
]

const canSubmit = () =>
  form.name.trim().length >= 2 &&
  EMAIL_PATTERN.test(form.email.trim()) &&
  form.message.trim().length >= MIN_MESSAGE_LENGTH

const handleSubmit = async () => {
  if (honeypot.value) return

  const { valid } = (await formRef.value?.validate()) ?? { valid: false }
  if (!valid || !canSubmit()) return

  submitting.value = true

  const formData = new URLSearchParams()
  formData.append('form-name', 'contact')
  formData.append('name', form.name.trim())
  formData.append('email', form.email.trim())
  formData.append('phone', form.phone.trim())
  formData.append('message', form.message.trim())

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    })

    if (!response.ok) throw new Error('Form submission failed')

    sent.value = true
    setTimeout(() => {
      sent.value = false
      emit('update:modelValue', false)
      resetForm()
    }, 5000)
  } catch (e) {
    console.error('Submit error', e)
  } finally {
    submitting.value = false
  }
}

const closeDialog = () => {
  sent.value = false
  emit('update:modelValue', false)
  resetForm()
}

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
  honeypot.value = ''
  formValid.value = false
  submitting.value = false
  formRef.value?.resetValidation()
}
</script>

<style scoped>
.form-title {
  padding-bottom: 0;
}

.form-subtitle {
  padding-top: 0.25rem;
  opacity: 0.75;
}

.form-field {
  margin-bottom: 0.25rem;
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.form-actions {
  padding: 0.5rem 1rem 1rem;
}

.success-dialog {
  padding: 2.5rem 1.5rem;
}

.success-text {
  margin-top: 1rem;
  font-size: 1.1rem;
}
</style>
