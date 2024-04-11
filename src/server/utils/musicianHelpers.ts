// export const checkInstrumentation = (
//     instruments: Instrument[],
//     musicians: Musician[]
//   ) => {
//     const instrumentObj: { [key: string]: string | null } = {}
  
//     instruments.forEach(
//       (instrument) => (instrumentObj[instrument.toLowerCase()] = null)
//     )
  
//     for (let i = 0; i < instruments.length; i++) {
//       for (let j = 0; j < musicians.length; j++) {
//         if (instruments[i].includes(musicians[j].instrument)) {
//           const instrumentKey = instruments[i].toLowerCase()
//           instrumentObj[instrumentKey] = musicians[j].name
//         } else {
//           null
//         }
//       }
//     }
  
//     const values = Object.values(instrumentObj)
//     const instArr = Object.entries(instrumentObj)
//     const result = values.filter((value) => value !== null)
  
//     const neededInstruments: string[] = []
  
//     instArr.map((inst) => {
//       const key = inst[0]
//       const value = inst[1]
  
//       if (value === null) {
//         neededInstruments.push(key)
//       }
//       return neededInstruments
//     })
  
//     if (result.length === instruments.length) {
//       return true
//     } else {
//       return [false, neededInstruments]
//     }
//   }