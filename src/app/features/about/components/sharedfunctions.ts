import * as $ from 'jquery';

export function formatXml(xml) {
  let formatted = '';
  const reg = /(>)(<)(\/*)/g;
  xml = xml.replace(reg, '$1\r\n$2$3');
  let pad = 0;
  $.each(xml.split('\r\n'), function(index, node) {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    let padding = '';
    for (let i = 0; i < pad; i++) {
      padding += '  ';
    }
    formatted += padding + node + '\r\n';
    pad += indent;
  });
  return formatted;
}

export function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function filterDelegate(obj: any, search: string): boolean {
  function filterProperty(property) {
    return (
      property != null &&
      property
        .toString()
        .toLowerCase()
        .indexOf(search) > -1
    );
  }
  search = search.toLowerCase();
  return (
    filterProperty(obj.CustomerName) ||
    filterProperty(obj.CustomerOrder) ||
    filterProperty(obj.DaysLEFT) ||
    filterProperty(obj.DeliveryDate) ||
    filterProperty(obj.EstimatedDelivery) ||
    filterProperty(obj.GUSQuotation) ||
    filterProperty(obj.GdeConfDate) ||
    filterProperty(obj.GdeConfirmation) ||
    filterProperty(obj.GusOrder) ||
    filterProperty(obj.GusOrderDate) ||
    filterProperty(obj.InvoiceNumber) ||
    filterProperty(obj.Notes) ||
    filterProperty(obj.OrderAmmout) ||
    filterProperty(obj.OrderDate) ||
    filterProperty(obj.QuoteDate) ||
    filterProperty(obj.QuotedAmmount) ||
    filterProperty(obj.ServiceOrders) 
  );
}

export function getJsonDetailsJoined(
  matchedRequestResponse,
  viewDetailsDataItem
) {
  function removeEmptyObject() {
    (matchedRequestResponse[0].response === null ||
      matchedRequestResponse[0].response === undefined) &&
      (matchedRequestResponse = matchedRequestResponse.slice(
        1,
        matchedRequestResponse.length
      ));
  }
  let isRequestResponseMatchFound = false;
  let findPair;
  removeEmptyObject();
  for (let t = 0; t < matchedRequestResponse.length; t++) {
    const pair = matchedRequestResponse[t];
    pair.request.requestID !== undefined &&
      pair.request.requestID === viewDetailsDataItem.requestID &&
      (findPair = pair);
  }
  findPair === undefined
    ? (isRequestResponseMatchFound = false)
    : (isRequestResponseMatchFound = true);

  return findPair;
}

export function ShouldRouteShipmentID(event) {
  let shouldRoute = false;
  if (event.shipmentID !== null && event.shipmentID !== undefined) {
    event.shipmentID.toString().length > 0 &&
      event.shipmentID.toString() !== '0' &&
      (shouldRoute = true);
  }
  return shouldRoute;
}

export function ShouldRoutePrimaryReference(event) {
  let shouldRoute = false;
  if (event.primaryReference !== null && event.primaryReference !== undefined) {
    event.primaryReference.length > 0 && (shouldRoute = true);
  }
  return shouldRoute;
}
