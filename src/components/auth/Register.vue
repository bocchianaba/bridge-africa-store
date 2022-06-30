<template>
  <v-app>
    <v-form v-model="valid"  @submit.prevent="userRegistration">
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title>
          <h1>Register</h1>
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
            <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                prepend-icon="mdi-lock"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                required
                ></v-text-field>
                <v-checkbox
                  v-model="user.rememberMe"
                  label="Remember Me ?"
                ></v-checkbox>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" @click="login">
          <v-icon>mdi-shield-account</v-icon>Login</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" type="submit"  color="success">
          <v-progress-circular
            indeterminate
            color="white"
            v-if="$store.state.status=='loading'"
          ></v-progress-circular>
          <v-icon v-else>mdi-account-plus</v-icon>Register</v-btn>
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
      showPassword:false,
      valid: false,
      usernameRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules:[
        v => !!v || 'Password is required',
      ],
      confirmPasswordRules: [v => !!v || "Password is required"],
      confirmPassword:"",
      user: {
        name: '',
        username: '',
        password: '',
        rememberMe: true,
      }
    };
  },
  methods: {
   async userRegistration() {
      await this.$store.dispatch('registerAction',this.user)
      this.$router.push((this.$router.history.current.query.from) ? {path:'login', query:{ from: this.$router.history.current.query.from} }: '/login')      
    },
    login() {
      this.$router.push((this.$router.history.current.query.from) ? {path:'login', query:{ from: this.$router.history.current.query.from} }: '/login')
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.user.password === this.confirmPassword || "Password must match";
    }
  }
};
</script>
