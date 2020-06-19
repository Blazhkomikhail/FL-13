const assign = function (mainObj, ...objs) {
	let parentObj = mainObj;
	objs.forEach( item => {
		for (let key in item) {
			if ( item.hasOwnProperty(key) ) {
				parentObj[key] = item[key];
			}
		}	
	})
	return parentObj;
}

const paymentCard = { cash : '100$' };
const creditCard = { creditLimit : '50$', cash: '200$' };
const universalCard = assign({}, creditCard, paymentCard);