<template>
  <!--
Exercice 3 - Vuex & Formulaires
1) Créer un magasin, module, Vuex avec le namespace "plats" pour les plats
   dans src/store/ et y ajouter le tableau des plats.
2) Créer un getter pour récupérer les plats
   et afficher ces derniers sur la page Exercice.vue à l'aide du getter
3) Ajouter la possibilité de supprimer un élément (clic sur bouton supprimer)
   en utilisant des actions et des mutations.
   Afficher une dialog de confirmation avant de supprimer.
4) Ajouter une validation au formulaire src/components/FormPlat.vue
     - nom: obligatoire avec un maximum de 20 caractères.
     - description: maximum de 155 caractères.
     - La validation doit être déclenchée lorsque l'on clique sur Sauvegarder
5) Ajouter la possibilité d'ajouter un élément
   indice: utiliser l'attribut "action" pour différencier l'ajout de la modification
6) Ajouter la possibilité de modifier un élément
7) Si aucune description n'est fournie pour un plat,
   afficher le texte "Aucune description fournie" en italique
8) Si aucune image n'est fournie, utiliser l'image statics/image-placeholder.png
-->

<q-card
  class="card">
  <q-img
    :src="plat.image ? plat.image : 'images/image-placeholder.png'"
    basic
    contain
  >
    <div class="absolute-bottom text-h6">
      {{ plat.nom }}
    </div>
  </q-img>

  <q-card-section>
    <q-rating
      readonly
      :model-value="plat.note"
      size="2em"
      color="orange"
      class="q-mt-sm"
    />
  </q-card-section>

  <q-card-section class="description">
    <span v-if="plat.description">{{ plat.description }}</span>
    <!-- TODO Utiliser DIV et helpers Quasar pour mise en forme texte -->
    <div class="text-italic" v-else>Pas de description fournie</div>

  </q-card-section>

  <q-card-actions
    class="absolute-bottom"
    align="right">
    <q-btn
      @click="afficherFormPlat = true"
      icon="edit"
      color="blue"
      flat>Modifier</q-btn>
    <!-- TODO Paramètre inutile -->
    <q-btn @click="confirmerSuppression(plat.id)"
      icon="delete"
      color="red"
      flat>Supprimer</q-btn>
  </q-card-actions>

  <q-dialog
    v-model="afficherFormPlat">
    <form-plat
      action="modifier"
      :platAModifier="plat"
      :v-close-popup="afficherFormPlat"
      @fermer="afficherFormPlat = false"/>
  </q-dialog>
</q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'plat',
  props: ['plat'],
  data () {
    return {
      afficherFormPlat: false
    }
  },
  components: {
    'form-plat': require('components/FormPlat.vue').default
  },
  methods: {
    // Mappage des actions ('nomNamespace', ['nomGetter'])
    ...mapActions('plats', ['supprimerPlat']),
    // Ouvre une boite de dialog pour confirmer la suppression
    confirmerSuppression (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Voulez vous supprimer ce plat ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // TODO supprimer le paramètre id de confirmerSuppression
        // TODO récupére l'id avec this.plat.id
        this.supprimerPlat(id)
      })
    }
  }
}
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd!important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
.card .description {
  padding: 5px 16px;
}
</style>
