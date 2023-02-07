<template>
<q-card class="form-card">
  <q-card-section>
    <div class="text-h6 heading">{{ action }} Plat</div>
  </q-card-section>

  <q-card-section>

    <div class="row q-mb-md">
      <q-input
        :rules="[
          val => !!val || 'Champ requis',
          val => val.length <= 20 || 'Maximum 20 caractères'
        ]"
        filled
        v-model="plat.nom"
        label="Nom (Burger)"
        class="col"
        ref="nom" />
    </div>

    <div class="row q-mb-md">
      <q-input
        :rules="[
          val => val.length <= 155 || 'Maximum 155 caractères'
        ]"
        filled
        v-model="plat.description"
        label="Description"
        type="textarea"
        class="col"
        ref="description" />
    </div>

    <div class="row q-mb-md">
      <q-input
        filled
        v-model="plat.image"
        label="URL de l'image"
        class="col" />
      <q-img
        :src="plat.image ? plat.image : 'images/image-placeholder.png'"
        class="q-ml-sm"
        contain />
    </div>

    <div class="q-mb-md">
      <div class="row">
        <p class="q-mb-none">Note:</p>
      </div>
      <div class="row">
        <q-rating
          v-model="plat.note"
          size="2em"
          color="orange" />
      </div>
    </div>

  </q-card-section>

  <q-card-actions align="right">
    <q-btn
      label="Annuler"
      color="grey"
      v-close-popup />
    <q-btn
      @click="formSubmit"
      label="Sauver"
      color="primary"/>
  </q-card-actions>
</q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'platForm',
  props: ['action', 'platAModifier'],
  data () {
    return {
      plat: {
        name: '',
        description: '',
        note: 1,
        image: ''
      }
    }
  },
  methods: {
    ...mapActions('plats', ['ajouterPlat', 'modifierPlat']),
    /**
     * formSubmit ()
     * Permet de vérifier la validité des champs avant d'envoyer le formulaire
     */
    formSubmit () {
      this.$refs.nom.validate()
      this.$refs.description.validate()

      // $refs correspond au ref du champ de saisie
      if (!this.$refs.nom.hasError && !this.$refs.description.hasError) {
        this.$emit('fermer')
        this.sauverPlat(this.plat)
      }
    },
    /**
     * sauverPlat ()
     * Enregistre le plat selon l'action demandée
     */
    sauverPlat () {
      if (this.action === 'ajouter') {
        this.ajouterPlat(this.plat)
      } else {
        this.modifierPlat(this.plat)
      }
    }
  },
  mounted () {
    if (this.action === 'modifier') {
      this.plat = Object.assign({}, this.platAModifier)
    }
  }
}
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
