<template>
  <v-card class="mb-0" flat>
    <v-card-title>
      <v-avatar size="36px" class="mr-3">
        <img alt="Avatar" :src="'https://i.pravatar.cc/150?u='+id" />
      </v-avatar>
      {{grade.name}}
      <br />
      <v-rating
        class="ml-4"
        :value="grade.grade"
        color="amber"
        dense
        half-increments
        readonly
        size="14"
      ></v-rating>
      <div class="subtitle-1 grey--text ml-2">{{grade.grade.toFixed(1)}}</div>
    </v-card-title>
    <v-card-text>{{grade.comment}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 1
    },
    grade: {
      type: Object,
      default: {
        name: "John doe",
        grade: 4,
        comment: "Hello world"
      }
    }
  }
};
</script>

<style scoped>
</style>