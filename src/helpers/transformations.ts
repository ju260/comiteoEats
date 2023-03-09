interface ArrayObject {
  type: string
}

function groupObjectByType(arrayObjects: ArrayObject[], keyObj: string): Record<string, ArrayObject[]> {
  return arrayObjects.reduce((acc, obj) => {
    const key = obj[keyObj]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

function sortObject(
  objectToSort: Record<string, ArrayObject[]>,
  order: string[]
): Record<string, ArrayObject[]> {
  return Object.keys(objectToSort)
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .reduce((acc, key) => {
      acc[key] = objectToSort[key]
      return acc
    }, {})
}

function formatPrice(priceInCentimes: number): string {
  return `${priceInCentimes / 100} €`
}


export { groupObjectByType, sortObject, formatPrice }
