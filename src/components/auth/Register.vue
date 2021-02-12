<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
        <h1>Register</h1>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form v-model="valid"  @submit.prevent="userRegistration">
          <v-layout column>
            <v-flex>
              <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="user.email"
                :rules="emailRules"
                required></v-text-field>
              </v-col>
            </v-flex>
            <v-flex>
              <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="user.password"
                :rules="passwordRules"
                required></v-text-field>
              </v-col>
            </v-flex>
            <v-flex>
              <v-col
              cols="12"
              sm="8"
              md="6"
            >
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                required
                ></v-text-field>
              </v-col>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn :disabled="!valid" color="primary" type="submit">Register</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//import firebase from "firebase";

export default {
  data() {
    return {
      valid: false,
      emailRules: [
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
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userRegistration() {
      this.$store.dispatch('registerAction',this.user)
      this.$router.push('/login')
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
