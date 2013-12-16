::::/bin/bash

# This line delete and create a new database every time this file is executed!
# If you don't want this just comment the line with a # before it
bash ./database.sh

# Create a instance of question, answer and comment using POST as HTTP verb to create them.
# You will need to pass the ID as it isn't autoincrement
curl --request POST 'http://localhost:4242/question' --data 'id=76&message=Question 76'
curl --request POST 'http://localhost:4242/answer' --data 'id=76&message=Answer 76&question=76'
curl --request POST 'http://localhost:4242/comment' --data 'id=76&message=Comment 76&answer=76'


# Get ALL question, answer and comment using GET as HTTP verb
# You must pass the name of the objects in singular NOT in plural
# If you use the wrong name it's gonna return a Not Found Error (404 - Client Error)
curl 'http://localhost:4242/question'
curl 'http://localhost:4242/answer'
curl 'http://localhost:4242/comment'


# Update question, answer and comment using PUT as HTTP verb
# You Must pass the ID of the object as a param NOT as data content
# If you don't pass the object ID as param it's gonna return a Not Found (404 - Client Error)
curl --request PUT 'http://localhost:4242/question/76' --data 'message=Question 76 updated!'
curl --request PUT 'http://localhost:4242/answer/76' --data 'message=Answer 76 updated!'
curl --request PUT 'http://localhost:4242/comment/76' --data 'message=Comment 76 updated!'


# Get which one of question, answer and comment using GET as HTTP verb
# You MUST pass the object ID as param NOT as a data content
# If you don't pass the object ID as param it's gonna return a Not Found (404 - Client Error)
curl 'http://localhost:4242/question/76'
curl 'http://localhost:4242/answer/76'
curl 'http://localhost:4242/comment/76'


# Delete question, answer and comment using DELETE as HTTP verb
# You MUST pass the object ID as param NOT as data content
# If you don't pass the object ID as param it's gonna return a Not Found (404 - Client Error)
curl --request DELETE 'http://localhost:4242/question/76'
curl --request DELETE 'http://localhost:4242/answer/76'
curl --request DELETE 'http://localhost:4242/comment/76'


# Using the "-I" param you can see the HEAD of the request
curl -I 'http://localhost:4242/question'
curl -I --request PUT 'http://localhost:4242/question/76' --data 'message=Question 76 updated!'
curl -I 'http://localhost:4242/question/76'


#STATUS CODE
# If you pass the wrong content for a POST method it's gonna return a Internal Error (500 - Server Error )
curl  --request POST 'http://localhost:4242/answer' --data 'id="89&message=Internal Error 500'

# If you try to get a object with a ID that doesn't exist it will return a Not Found Error (404 - Client Error)
curl 'http://localhost:4242/answer/6474' #not found

# If you try to created a object and everything is OK it will return just a HEAD with a Created Message (201)
curl --request POST 'http://localhost:4242/question' --data 'id=77&message=Question 77' #created

# If you try to get answers from a question with no answers it will return just a HEAD with a No Content Message (204 - Successful)
curl -I 'http://localhost:4242/question/76/answer' #no content

#if you request a question, answer and comment that exists it you return you the content and a HEAD with OK Message (200 - Successful)
curl -I 'http://localhost:4242/question/77' #ok