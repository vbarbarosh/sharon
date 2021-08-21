// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#sheet
function sheet_render(rows)
{
    return {
        rowData: rows.map(function (cols) {
            return {
                values: cols.map(function (value) {
                    switch (typeof value) {
                    case 'boolean':
                        return {userEnteredValue: {boolValue: value}};
                    case 'number':
                        return {userEnteredValue: {numberValue: value}};
                    default:
                        // Invalid sheets[0].data[0]: Your input contains more than the maximum of 50000 characters in a single cell.
                        return {userEnteredValue: {stringValue: String(value||'').substr(0, 50000)}};
                    }
                }),
            };
        }),
    };
}

export default sheet_render;
