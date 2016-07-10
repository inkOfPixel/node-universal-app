/**
* Copyright (c) 2016, inkOfPixel, Srl.
* All rights reserved.
*/

export default function entities(state = {
}, action) {
	if (action.json && action.json.entities) {
		return {
			...state,
			...action.json.entities
		};
	}
	return state;
}
