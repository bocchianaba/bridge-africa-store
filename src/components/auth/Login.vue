<template>
  <v-app>
    <v-form v-model="valid"  @submit.prevent="userLogin">
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title class="pb-0">
          <h1 style="justify-content: center;align-items: center;">Login</h1>
        </v-card-title>
        <v-card-text style="margin-top:40px">
            <v-text-field 
              name="username"
              label="Email"
              id="username"
              type="username"
              v-model="user.username"
              :rules="usernameRules"
              required
              prepend-icon="mdi-account-circle"
            />
            <v-text-field 
              name="password"
              label="Password"
              id="password"
              v-model="user.password"
              :rules="passwordRules"
              required
              :type="showPassword ? 'text' : 'password'" 
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
          <v-checkbox
            v-model="user.rememberMe"
            label="Remember Me ?"
          ></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" @click="register">
            <v-icon>mdi-account-plus</v-icon>
            Register
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" type="submit"  color="success">
          <v-progress-circular
            indeterminate
            color="white"
            v-if="$store.state.status=='loading'"
          ></v-progress-circular>
          <v-icon v-else>mdi-account-check</v-icon>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
      valid: false,
      usernameRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules:[
        v => !!v || 'Password is required',
      ],
      user: {   
        username: window.localStorage.getItem('bas_username') || '',
        password: window.localStorage.getItem('bas_password') || '',
        rememberMe: true
      }
    };
  },
  methods: {
    async userLogin() {
      await this.$store.dispatch('loginAction', this.user)
      this.$router.push((this.$router.history.current.query.from)?this.$router.history.current.query.from:'/home')
    },
    register() {
      this.$router.push((this.$router.history.current.query.from) ? {path:'register', query:{from: this.$router.history.current.query.from} }: '/register')
    }
  }
};
</script>
