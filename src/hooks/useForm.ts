import { z } from 'zod';
import { useState } from 'react';

interface IUseForm<TRequest> {
  /** Validators for each form field */
  validators: { [K in keyof TRequest]: any };

  /** Initial values for the form */
  initialValues?: Partial<TRequest>;
}

const useForm = <TRequest>({
  validators,
  initialValues,
}: IUseForm<TRequest>) => {
  type TRequestFields = keyof TRequest;

  // Structure of each field's state
  type TState = {
    [K in TRequestFields]: {
      value: string;
      error: string;
    };
  };

  // Create the form's state, each key should have a value and error entry
  const initialState = Object.fromEntries(
    Object.keys(validators).map((key) => {
      const initialValue = initialValues?.[key as keyof TRequest];
      return [key, { value: initialValue ?? '', error: '' }];
    }),
  ) as TState;

  const [state, setState] = useState<TState>(initialState);

  /**
   * Take the state and transform it into a state that can be used
   * to make API requests. Do this by removing the error fields, and converting to an object
   * e.g. {key1: {value: "value", error: ""}} --> {key1: "value"}
   */
  const reducedState: TRequest = (() => {
    const entries = Object.entries(state) as [
      TRequestFields,
      TState[TRequestFields],
    ][];

    const mappedEntries = entries.map(([KeyboardEvent, fieldState]) => [
      KeyboardEvent,
      fieldState.value,
    ]);

    return Object.fromEntries(mappedEntries);
  })();

  /**
   * Set the value for a field in a form; clears
   * the error message for that field
   */
  const setValue = <T extends TRequestFields>(key: T, value: TRequest[T]) => {
    setState((prev) => ({
      ...prev,
      [key]: {
        value,
        error: '', // Clear the error when the values changes
      },
    }));
  };

  /**
   * Set the error message for a field in the form
   */
  const setError = (key: TRequestFields, error: string) => {
    setState((prev) => ({
      ...prev,
      [key]: {
        value: prev[key].value,
        error,
      },
    }));
  };

  /**
   * Validates a form, setting the error message for each
   * field that has an error
   * @returns true if the form is valid, false otherwise
   */
  const validateState = () => {
    const validatorsSchema = z.object(validators);
    const validatorsResult = validatorsSchema.safeParse(reducedState);

    if (validatorsResult.success === false) {
      const errors = validatorsResult.error.errors;

      for (const error of errors) {
        const field = error.path.join('.');

        setError(field as TRequestFields, error.message);
      }

      return false;
    }

    return true;
  };

  /**
   * Clear all entries in the form back to the
   * original state
   */
  const clear = () => {
    setState(initialState);
  };

  return {
    state,
    clear,
    setValue,
    setError,
    validateState,
  };
};

export default useForm;
