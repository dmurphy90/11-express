# 11 Express

## Installation 
To get started fork then clone this repository to your machine, then navigate to the folder ```lab-dean```. Type ```npm install``` to install the dependencies needed. Then I recommend acquiring the program HTTPie to run the commands.

## Functionality

This is the back-end for a note making APP using express to make CRUD requests. There are 5 functions usable within this app.

* ```POST "api/v1/note``` Requires title and content values to create a new Note object. An example command on HTTPie would be.
```http POST http://localhost:3000/api/v1/note title="hello" content="tim"```

* ```GET "api/v1/note``` This will get you every Note object saved into the server. To do this you simply type:
```http http://localhost:3000/api/v1/note```

* ```GET "api/v1/note/:_id``` When the ```id``` parameter in the link is filled in with the ID of an actual note object it will retrieve you that specific entry. An example: 
```http http://localhost:3000/api/v1/note/12345_6789_1234_56789```

* ```PUT "api/v1/note/:_id``` When the ```id``` parameter in the link is filled in with the ID of an actual note object it will update the item associated with the typed in ID. An example command:
```http PUT http://localhost:3000/api/v1/note/12345_6789_1234_56789 title="goodbye" content="tim"```

* ```DELETE "api/v1/note/:_id``` When the ```id``` parameter in the link is filled in with the ID of an actual note object it will delete the item associated with the typed in ID. Example command:
```http DELETE http://localhost:3000/api/v1/note/12345_6789_1234_56789```