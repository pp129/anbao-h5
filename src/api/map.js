import axios from 'axios'
export const getSolve = stops => {
  const data = {
    stops: stops,
    barriers: '',
    polylineBarriers: '',
    polygonBarriers: '',
    outSR: '',
    ignoreInvalidLocations: true,
    accumulateAttributeNames: '',
    impedanceAttributeName: 'Length',
    restrictionAttributeNames: '',
    attributeParameterValues: '',
    restrictUTurns: 'esriNFSBAllowBacktrack',
    useHierarchy: false,
    returnDirections: false,
    returnRoutes: true,
    returnStops: true,
    returnBarriers: false,
    returnPolylineBarriers: false,
    returnPolygonBarriers: false,
    directionsLanguage: 'en-US',
    directionsStyleName: '',
    outputLines: 'esriNAOutputLineTrueShape',
    findBestSequence: false,
    preserveFirstStop: false,
    preserveLastStop: false,
    useTimeWindows: false,
    startTime: 0,
    outputGeometryPrecision: '',
    outputGeometryPrecisionUnits: 'esriDecimalDegrees',
    directionsOutputType: 'esriDOTComplete',
    directionsTimeAttributeName: '',
    directionsLengthUnits: 'esriNAUMiles',
    returnZ: false,
    f: 'pjson'
  }
  return axios.get('/arcgis', {
    params: data
  }).then(res => {
    return res.data
  }).catch(() => {
    return false
  })
}
