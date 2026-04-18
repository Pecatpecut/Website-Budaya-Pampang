<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="overlay" @click.self="$emit('close')">
        <div class="modal-box">
          <div class="icon-wrap"><i class="bi bi-exclamation-triangle-fill"></i></div>
          <h5>Hapus Data?</h5>
          <p>Tindakan ini tidak bisa dibatalkan. Data yang dihapus tidak bisa dikembalikan.</p>
          <div class="actions">
            <button class="btn-cancel" @click="$emit('close')">Batal</button>
            <button class="btn-confirm" @click="$emit('confirm')">
              <i class="bi bi-trash me-1"></i>Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({ show: Boolean })
defineEmits(['close', 'confirm'])
</script>

<style scoped>
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(2px); }
.modal-box { background: white; border-radius: 20px; padding: 36px 32px 28px; width: 340px; max-width: 90vw; text-align: center; box-shadow: 0 24px 60px rgba(0,0,0,0.15); }
.icon-wrap { width: 60px; height: 60px; background: #fff4f4; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 26px; color: var(--red); }
h5 { font-size: 17px; font-weight: 700; margin: 0 0 8px; color: #1a1a1a; }
p  { font-size: 13px; color: #888; margin: 0 0 24px; line-height: 1.5; }
.actions { display: flex; gap: 10px; }
.btn-cancel { flex: 1; padding: 11px; border-radius: 10px; border: 1.5px solid #e0e0e0; background: white; font-size: 14px; cursor: pointer; transition: 0.2s; }
.btn-cancel:hover { background: #f5f5f5; }
.btn-confirm { flex: 1; padding: 11px; border-radius: 10px; border: none; background: var(--red); color: white; font-size: 14px; font-weight: 500; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
.btn-confirm:hover { background: var(--red-dark, #8b2323); }
.modal-enter-active, .modal-leave-active { transition: 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.92) translateY(12px); }
</style>