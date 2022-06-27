<template>
  <v-app>
    <v-form v-model="valid"  @submit.prevent="userRegistration">
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title class="pb-0">
          <h1 style="text-align:center">Register</h1>
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
            <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                v-model="confirmPassword"
                :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
                required
                ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" to="/login">Login</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" type="submit"  color="success">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-app>
</template>
