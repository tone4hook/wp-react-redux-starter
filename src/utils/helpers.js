// helper utilities

export const urlBase = "http://yoursite.com/wp-json/wp/v2/";

// check if the object has a valid featured image
// if !medium-large size then uses source_url
export function hasFeaturedImage(obj) {
	switch (true) {
		case obj.featured_media === 0:
			return false;
			break;

		case !isNotTypeOfUndefined(obj._embedded["wp:featuredmedia"]):
			return false;
			break;

		case isNotTypeOfUndefined(obj._embedded["wp:featuredmedia"][0].message):
			return false;
			break;

		case isNotTypeOfUndefined(
			obj._embedded["wp:featuredmedia"][0].media_details.sizes
		):
			if (
				isNotTypeOfUndefined(
					obj._embedded["wp:featuredmedia"][0].media_details.sizes
						.medium_large
				)
			) {
				return obj._embedded["wp:featuredmedia"][0].media_details.sizes
					.medium_large.source_url;
			} else {
				return obj._embedded["wp:featuredmedia"][0].media_details.sizes
					.full.source_url;
			}
			break;

		default:
			return false;
	}
}

export function isNotTypeOfUndefined(item) {
	return typeof item !== "undefined" ? true : false;
}

export function setDateString(str) {
	let date = new Date(str);
	return date.toUTCString();
}

export function getContentStringFromSlug(str) {
	if (isNotTypeOfUndefined(str)) {
		str = str.replace(/-/g, " ");
		str = str
			.toLowerCase()
			.split(" ")
			.map(s => s.charAt(0).toUpperCase() + s.substring(1))
			.join(" ");
		return str;
	} else {
		return "";
	}
}
