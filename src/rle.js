function rle_encode(data) {
	let sameCharCounter = 0
	let previousChar = ''

	let newData = ""

	for (let i = 0; i < data.length; i++) {

		// If the current character is identical to the previous one, it adds one to the sameCharCounter
		// Otherwise, if the current character is NOT identical to the previous one, and sameCharCounter is above zero, that means that just before it there was a cluster of identical characters, so it adds the previous character and the number of repetitions to newData
		// If all the previous conditions are false, and there is not an identical character in front of the current one, it adds itself to newData
		if (data[i] === previousChar) {
			sameCharCounter++
		} else if (sameCharCounter > 0) {
			newData += `${previousChar}\\${sameCharCounter + 1}\\`

			// This is done so that members of clusters can still add the cluster behind it without its own character being printed twice
			if (data[i] != data[i + 1]) {
				newData += data[i]
			}
			sameCharCounter = 0
		} else if (data[i] != data[i + 1]) {
			newData += data[i]
		}
		previousChar = data[i]
	}

	// This allows clusters at the end of the data to still be added
	if (sameCharCounter > 0) {
		newData += `${previousChar}\\${sameCharCounter + 1}\\`
	}

	return newData
}

function rle_decode(data) {
	let newData = ""

	for (let i = 0; i < data.length; i++) {

		// ...
		if (data[i] == '\\' || (data[i - 1] == '\\' && !isNaN(data[i]) && data[i + 1] == '\\')) {
			continue
		} else if (data[i + 1] == '\\' && !isNaN(data[i + 2])) {

			let num = data[i + 2]
			let lastChar

			for (let j = i + 3; j != data.length && !isNaN(data[j]); j++) {
				num += data[j]
				lastChar = j
			}

			if (data[lastChar] == '\\') {
				num = parseInt(num)
				for (let k = 0; k < num; k++) {
					newData += data[i]
				}
			}
		} else {
			newData += data[i]
		}
	}
	return newData
}