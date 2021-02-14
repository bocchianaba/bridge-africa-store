<template>
  <v-app>
    <v-form v-model="valid"  @submit.prevent="userLogin">
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title class="pb-0">
          <h1 style="justify-content: center;align-items: center;">Login</h1>
        </v-card-title>
        <v-card-text style="margin-top:40px">
            <v-text-field 
              name="email"
              label="Email"
              id="email"
              type="email"
              v-model="user.email"
              :rules="emailRules"
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
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" to="/register"><v-icon>mdi-account-plus</v-icon>Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" type="submit"  color="success"><v-icon>mdi-account-check</v-icon>Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-app>
</template>

<script>
//import firebase from "firebase";

export default {
  data() {
    return {
      showPassword: false,
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules:[
        v => !!v || 'Password is required',
      ],
      user: {   
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userLogin() {
      this.$store.dispatch('loginAction', this.user)
      this.$router.push('/home')
    }
  },
};
</script>
