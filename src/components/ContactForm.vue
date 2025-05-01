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
    max-width="500px"
  >
    <v-card>
      <v-card-title class="text-h6">Contact me</v-card-title>
      <v-card-subtitle class="text-h6">Send me a message, let's chat!</v-card-subtitle>

      <v-card-text>
        <v-form ref="formRef" v-model="formValid">
          <v-text-field
            v-model="form.name"
            label="Name"
            :rules="[v => !!v || 'Name is required']"
            required
          />
          <v-text-field
            v-model="form.phone"
            label="Phone"
            :rules="[v => !!v || 'Phone is required']"
            required
          />
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            :rules="[v => !!v || 'Email is required']"
            required
          />
          <v-textarea
            v-model="form.message"
            label="Message"
            rows="4"
          />

          <v-card-actions>
            <v-btn @click="closeDialog">Cancel</v-btn>
            <v-btn
              color="primary"
              :disabled="!formValid"
              @click="handleSubmit"
            >
              Send
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Confirmation Dialog -->
  <v-dialog
    :model-value="modelValue && sent"
    @update:modelValue="emit('update:modelValue', $event)"
    max-width="400px"
  >
    <v-card>
      <v-card-text class="text-center pa-6">
        <v-icon size="48" color="green">mdi-check-circle</v-icon>
        <p>Your message was sent!</p>
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

const sent = ref(false)
const formValid = ref(false)
const formRef = ref()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const handleSubmit = async () => {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  const formData = new URLSearchParams()
  formData.append('form-name', 'contact')
  formData.append('name', form.name)
  formData.append('email', form.email)
  formData.append('phone', form.phone)
  formData.append('message', form.message)

  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    })

    sent.value = true
    setTimeout(() => {
      sent.value = false
      emit('update:modelValue', false)
      resetForm()
    }, 5000)
  } catch (e) {
    console.error('Submit error', e)
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
  formValid.value = false
  formRef.value?.resetValidation()
}
</script>

<style scoped>
.pa-6 {
  padding: 6rem;
}
</style>
