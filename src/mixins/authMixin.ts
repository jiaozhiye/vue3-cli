/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:29:31
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-13 23:54:18
 */
const deepMapAuth = (arr, mark) => {
  let res = null;
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i].children)) {
      res = deepMapAuth(arr[i].children, mark);
    }
    if (res) {
      return res;
    }
    if (arr[i].key === mark) {
      return arr[i];
    }
  }
  return res;
};

export const authority = {
  computed: {
    $auths(): Array<string> {
      const target = deepMapAuth(this.$store.state.app.navList, this.$route.path) || {};
      return target.permission || [];
    },
  },
};
