// State : données du magasin
const state = {
  plats: [
    {
      id: 1,
      image: 'https://i.imgur.com/0umadnY.jpg',
      nom: 'Burger',
      description: "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
      note: 4
    },
    {
      id: 2,
      image: 'https://i.imgur.com/b9zDbyb.jpg',
      nom: 'Pizza',
      description: "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
      note: 5
    },
    {
      id: 3,
      image: 'https://i.imgur.com/RbKjUjB.jpg',
      nom: 'Petits choux',
      description:
        'Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...',
      note: 1
    },
    {
      id: 4,
      image: 'https://i.imgur.com/xAuhNVg.jpg',
      nom: 'BBQ Ribs',
      description: 'Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.',
      note: 5
    }
  ]
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  /**
   * Supprime le plat dont on a fourni l'id
   * @param state le magasin de plat
   * @param id l'id du plat a supprimer
   */
  // TODO renommer les mutations en majuscules supprimerPlat => SUPPRIMER_PLAT
  supprimerPlat (state, id) {
    // Filtre les données du tableau
    // et garde les tâches dont l'id est différent de celui à supprimer
    state.plats = state.plats.filter(el => el.id !== id)
  },
  /**
   * ajoute un plat au magasin
   * @param state le magasin de plats
   * @param plat le plat a ajouter
   */
  ajouterPlat (state, plat) {
    state.plats.push(plat)
  },
  /**
   * Modifie un plat dont on a fourni l'id
   * @param state le magasin de plats
   * @param plat le plat a modifier
   */
  modifierPlat (state, plat) {
    // Recherche la tâche et retourne sa position dans le tableau, son index
    const index = state.plats.findIndex(el => el.id === plat.id)

    // Si une tâche a été trouvée
    if (index !== -1) {
      // Modifie l'objet trouvé avec les nouvelles valeurs
      Object.assign(state.plats[index], plat)
    }
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  // TODO Ajouter les blocs de commentaires
  supprimerPlat ({ commit }, id) {
    commit('supprimerPlat', id)
  },
  ajouterPlat ({ commit }, plat) {
    let uId = 1
    // Si le tableau contient des éléments
    if (state.plats.length) {
      // Récupère l'id MAX et lui ajoute 1
      uId = Math.max(...state.plats.map(plat => plat.id)) + 1
    }
    // Ajoute le nouvel id au plat
    plat.id = uId
    commit('ajouterPlat', plat)
  },
  modifierPlat ({ commit }, payload) {
    // Valide la mutation et y passe les données
    commit('modifierPlat', payload)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  getPlats (state) {
    return [...state.plats].sort((a, b) => (a.nom.localeCompare(b.nom)))
    // TODO toujours retourner un copie
    // TODO trier et filter les données si nécessaire
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // https://usefulangle.com/post/227/javascript-sort-array-of-objects
    // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace l'objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
