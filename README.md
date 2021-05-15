# Bookmark Manager
* **Built with Angular 8**
* **NGRX for managing the state**
* **Angular Material for the user interface**

## Prerequisites
* **Node 8.9+ and  NPM 5.5.1+  installed** - download from here https://nodejs.org/en/download/ and install

## Description of the solution
**Bookmarks Module** - composed of components, models, services and NGRX Actions, Reducers, Effects and Selectors to manipulate the state of the Bookmarks data

![Alt text](./src/assets/snippets/bm-module.PNG)

#### Bookmark Components
* **bookmarks.component** - main component for the bookmark manager page (renders toolbar, side nav and listing)
* **bookmark-form-dialog.component** - displays bookmark form dialog for adding/editing bookmark
* **delete-confirmation-dialog.component** - displays confirmation dialog before deleting

#### Bookmark Model
* **bookmarks.model** = model interface for the Bookmark entity

#### Bookmark Service
* **bookmarks.service** = used to interact with the REST API
* **methods**
  * createBookmark() - for adding new bookmark to db
  * getBookmarks() - for getting all bookmarks from db
  * editBookmark() - for updating a bookmark data in db
  * deleteBookmark() - for deleting a bookmark data
  
#### Bookmark NGRX Actions
* **loadBookmarks** = to Load Bookmarks
* **loadBookmarksSuccess** = action to call for load success
* **loadBookmarksFailure** = action to call for load failure
* **addBookmark** = to add Bookmarks
* **addBookmarkSuccess** = action to call for add success
* **addBookmarkFailure** = action to call for add failure
* **updateBookmark** = to Update a Bookmark
* **deleteBookmark** = to Delete a Bookmark
* **deleteBookmarkSuccess** = action to call for delete success
* **deleteBookmarkFailure** = action to call for delete failure

#### Bookmark NGRX Reducers
* **addBookmarkSuccess** = adds new data and returns a newly added bookmark to the state
* **loadBookmarksSuccess** = adds and returns all bookmarks fetched to the state
* **loadBookmarksFailure** = returns error to the state if bookmark fetching has failed
* **updateBookmark** = updates and returns updated bookmark to the state
* **deleteBookmarkSuccess** = removes data and returns updated state upon success
* **deleteBookmarkFailure** = returns error to the state if bookmark deletion has failed

#### Bookmark NGRX Selectors
* **selectBookmarks** = retrieves all the bookmark entities and returns an observable
* **selectBookmarkGroups** = retrieves all the bookmark group entities and returns an observable
* **selectBookmarksByGroup** = retrieves all the bookmark entities by group and returns an observable

#### Bookmark NGRX Effects
* **loadBookmarks$** = triggered by loadBookmarks and calls loadBookmarksSuccess or loadBookmarksFailure
* **createBookmark$** = triggered by addBookmarkSuccess and calls addBookmarkSuccess or addBookmarkFailure
* **updateBookmark$** = triggered by updateBookmark
* **deleteBookmark$** = triggered by deleteBookmark and calls deleteBookmarkSuccess or deleteBookmarkFailure


## Screenshots of the working solution
#### Bookmark Listing - Initial View
![Alt text](./src/assets/snippets/bm-1.PNG)

#### Add Bookmark Dialog
![Alt text](./src/assets/snippets/bm-add-1.PNG)

#### After Add - Bookmark Has Been Added in the List
![Alt text](./src/assets/snippets/bm-add-3.PNG)

#### Delete Bookmark Dialog
![Alt text](./src/assets/snippets/bm-delete-1-boxed.png)

#### Edit Bookmark Dialog
![Alt text](./src/assets/snippets/bm-edit-1-boxed.png)

#### After Edit - Bookmark Has Been Updated in the List
![Alt text](./src/assets/snippets/bm-edit-2-boxed.png)

#### Groups
![Alt text](./src/assets/snippets/bm-group-3-boxed.png)


## Instructions how to run the application
1.) Go to https://github.com/joannalanuza/bookmark-manager.git

2.) Download the repository by clicking 'Code' button then 'Download ZIP'

3.) Extract the downloaded zip file

4.) Open CLI and cd to bookmark-manager root folder where you can find the following files, package.json, angular.json, etc.

5.) Run the following:
```sh
npm install
npm run generate
npm run server
```
6.) Open another CLI Window, cd to bookmark-manager root folder, and run the following
```sh
ng serve
```
7.) Once compilation is successful, open browser and go to http://localhost:4200/bookmarks

8.) You should now be able to access the bookmarks manager page

