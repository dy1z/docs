<template>
  <span v-html="version" />
</template>

<script>
export default {
  name: 'LatestReleaseNumber',
  computed: {
    version() {
      return this.$static.releases.edges[0].node.tag.replace('v', '')
    }
  }
}
</script>


<static-query>
query {
  releases: allReleases {
    edges {
      node {
        tag
        url
      }
    }
  }
}
</static-query>
