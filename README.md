Creates a Google Spreadsheet from data and returns url to
navigate it in a browser.

Here is how it works:

1. Store POST data in a temporary file
2. Request oauth2 code
3. Exchange oauth2 code for access token
4. Create a spreadsheet
5. Return url to the spreadsheet

## Using

Actually, the following snippet won't work as expected. This is
because session created in `curl` request is not shared with the
browser.

    curl > redirect.txt http://127.0.0.1:3000 -H Content-Type:application/json -d '[
        {
            "id": "NQQ_WKbjMZ0",
            "width": 4207,
            "height": 2805,
            "title": "eyeglasses with black frames",
            "description": "Round hipster sunglasses on pink background. Fashion accessory for women",
            "thumbnail_url": "https://icv.bannernow.com/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1577400983943-874919eca6ce&type=jpeg&w=400&type=jpeg&end=.jpg",
            "page_url": "https://unsplash.com/photos/NQQ_WKbjMZ0",
            "author_url": "https://unsplash.com/@lunarts"
        },
        {
            "id": "kqguzgvYrtM",
            "width": 5000,
            "height": 3984,
            "title": "person holding brown eyeglasses with green trees background",
            "description": "My Nature View! \nPayPal me on: https://www.paypal.com/donate?hosted_button_id=CVWLB468MAMZE",
            "thumbnail_url": "https://icv.bannernow.com/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1512099053734-e6767b535838&type=jpeg&w=400&type=jpeg&end=.jpg",
            "page_url": "https://unsplash.com/photos/kqguzgvYrtM",
            "author_url": "https://unsplash.com/@budhelisson"
        },
        {
            "id": "qmnpqDwla_E",
            "width": 5235,
            "height": 3490,
            "title": "person holding eyeglasses",
            "description": "out of focus clarity",
            "thumbnail_url": "https://icv.bannernow.com/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1516714819001-8ee7a13b71d7&type=jpeg&w=400&type=jpeg&end=.jpg",
            "page_url": "https://unsplash.com/photos/qmnpqDwla_E",
            "author_url": "https://unsplash.com/@joshcala"
        },
        {
            "id": "bSjqyqukCjY",
            "width": 3999,
            "height": 5999,
            "title": "black framed eyeglasses on brown wooden table",
            "description": null,
            "thumbnail_url": "https://icv.bannernow.com/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1591076482161-42ce6da69f67&type=jpeg&w=400&type=jpeg&end=.jpg",
            "page_url": "https://unsplash.com/photos/bSjqyqukCjY",
            "author_url": "https://unsplash.com/@angus_buchanan"
        }
    ]'
    xdg-open `cat redirect.txt`

The following will work:

    <form action="http://127.0.0.1:3000" method="POST">
        <input type="hidden" name="items" value="[{&quot;id&quot;:&quot;NQQ_WKbjMZ0&quot;,&quot;width&quot;:4207,&quot;height&quot;:2805,&quot;title&quot;:&quot;eyeglasses with black frames&quot;,&quot;description&quot;:&quot;Round hipster sunglasses on pink background. Fashion accessory for women&quot;,&quot;thumbnail_url&quot;:&quot;https://icv.bannernow.com/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1577400983943-874919eca6ce&amp;type=jpeg&amp;w=400&amp;type=jpeg&amp;end=.jpg&quot;,&quot;page_url&quot;:&quot;https://unsplash.com/photos/NQQ_WKbjMZ0&quot;,&quot;author_url&quot;:&quot;https://unsplash.com/@lunarts&quot;},{&quot;id&quot;:&quot;kqguzgvYrtM&quot;,&quot;width&quot;:5000,&quot;height&quot;:3984,&quot;title&quot;:&quot;person holding brown eyeglasses with green trees background&quot;,&quot;description&quot;:&quot;My Nature View! \nPayPal me on: https://www.paypal.com/donate?hosted_button_id=CVWLB468MAMZE&quot;,&quot;thumbnail_url&quot;:&quot;https://icv.bannernow.com/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1512099053734-e6767b535838&amp;type=jpeg&amp;w=400&amp;type=jpeg&amp;end=.jpg&quot;,&quot;page_url&quot;:&quot;https://unsplash.com/photos/kqguzgvYrtM&quot;,&quot;author_url&quot;:&quot;https://unsplash.com/@budhelisson&quot;},{&quot;id&quot;:&quot;qmnpqDwla_E&quot;,&quot;width&quot;:5235,&quot;height&quot;:3490,&quot;title&quot;:&quot;person holding eyeglasses&quot;,&quot;description&quot;:&quot;out of focus clarity&quot;,&quot;thumbnail_url&quot;:&quot;https://icv.bannernow.com/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1516714819001-8ee7a13b71d7&amp;type=jpeg&amp;w=400&amp;type=jpeg&amp;end=.jpg&quot;,&quot;page_url&quot;:&quot;https://unsplash.com/photos/qmnpqDwla_E&quot;,&quot;author_url&quot;:&quot;https://unsplash.com/@joshcala&quot;},{&quot;id&quot;:&quot;bSjqyqukCjY&quot;,&quot;width&quot;:3999,&quot;height&quot;:5999,&quot;title&quot;:&quot;black framed eyeglasses on brown wooden table&quot;,&quot;description&quot;:null,&quot;thumbnail_url&quot;:&quot;https://icv.bannernow.com/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1591076482161-42ce6da69f67&amp;type=jpeg&amp;w=400&amp;type=jpeg&amp;end=.jpg&quot;,&quot;page_url&quot;:&quot;https://unsplash.com/photos/bSjqyqukCjY&quot;,&quot;author_url&quot;:&quot;https://unsplash.com/@angus_buchanan&quot;}]">
        <input type="submit" value="View in Spreadsheet">
    </form>

## Building

    bin/build

## Configuration

    cat > .env << EOF
    CLIENT_ID=xxx
    CLIENT_SECRET=123123123123123
    REDIRECT_URI=http://127.0.0.1:3000
    EOF

## Running locally

    bin/run

    or

    xdg-open http://127.0.0.1:3000
    docker run --env-file=.env --rm -p 3000:80 sharon

    or

    xdg-open http://127.0.0.1:3000
    docker-compose up
