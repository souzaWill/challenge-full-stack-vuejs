export function getFieldErrors(
  errors: { field: string; message: string }[] | null | undefined,
  field: string,
): string[] {
  return errors?.filter((error) => error.field === field).map((error) => error.message) ?? []
}
