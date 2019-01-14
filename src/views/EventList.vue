<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <router-link
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
    >
      Previus Page
    </router-link>
    <router-link
      :to="{ name: 'event-list', query: { page: page + 1 } }"
      rel="prev"
      v-if="event.eventCount > page * 3"
    >
      Next Page
    </router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },

  created() {
    this.$store.dispatch('event/fetchEvents', {
      perPage: 3,
      page: this.page
    })
  },

  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'user'])
  }
}
</script>
