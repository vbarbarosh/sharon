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
                        return {userEnteredValue: {stringValue: String(value||'')}};
                    }
                }),
            };
        }),
    };
}

export default sheet_render;
