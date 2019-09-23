export const setCurrentUserDetails = userDetails => ({
  type: "SET_CURRENT_USER_DETAILS",
  country: userDetails.country,
  displayName: userDetails.display_name,
  email: userDetails.email,
  externalUrls: userDetails.external_urls,
  followers: userDetails.followers,
  href: userDetails.href,
  id: userDetails.id,
  images: userDetails.images,
  product: userDetails.product,
  userType: userDetails.type,
  uri: userDetails.uri
});
