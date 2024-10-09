import {
  authSlice,
  clearErrorMsg,
  onChecking,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("Pruebas en authSlice", () => {
  test("debe de regresar el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("debe de realizar un login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));

    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });

  test("debe de realizar el logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("debe de realizar el logout con error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessage,
    });
  });

  test("debe de limpiar el mensaje de error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

    const newState = authSlice.reducer(state, clearErrorMsg());
    expect(newState.errorMessage).toBe(undefined);
  });

  test("debe de llamar el onChecking y retornar el estado inicial", () => {
    const state = authSlice.reducer(authenticatedState, onChecking());

    expect(state).toEqual(initialState);
  });
});
