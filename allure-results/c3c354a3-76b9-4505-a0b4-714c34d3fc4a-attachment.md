# Page snapshot

```yaml
- dialog:
  - heading "Add a new pet to the Petstore!" [level=1]
  - heading "Please fill out the form to add a new pet to the Petstore" [level=3]
  - button "General Information Tell us some things about your pet!" [expanded]:
    - heading "General Information" [level=3]
    - paragraph: Tell us some things about your pet!
  - region "General Information Tell us some things about your pet!":
    - textbox "Name"
    - text: Name
    - listbox "Status"
    - text: Status
  - button "Category Specify your pets' category":
    - heading "Category" [level=3]
    - paragraph: Specify your pets' category
  - button "Tags Specify your pets' tags":
    - heading "Tags" [level=3]
    - paragraph: Specify your pets' tags
  - button "Images 0 Images added":
    - heading "Images" [level=3]
    - paragraph: 0 Images added
  - button "CLOSE"
  - button "CREATE" [disabled]
```