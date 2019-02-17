export function getAddress({
  street,
  city,
  state,
  zip,
}) {
  return [
    street,
    city,
    state,
    zip,
  ].filter((s) => !!s)
    .join(' ');
}
