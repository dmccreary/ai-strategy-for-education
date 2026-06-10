# Mascot Style Guide

This page shows all mascot admonition styles for Sage the Owl.
Use it to verify that images load correctly and admonition colors render as expected.

!!! mascot-neutral "A Note from Sage"
    ![Sage neutral pose](../../img/mascot/neutral.png){ class="mascot-admonition-img" }
    This is the **neutral** style — used for general sidebars, introductions, or any
    content that doesn't call for a specific emotional tone.

!!! mascot-welcome "Welcome!"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This is the **welcome** style — used at the opening of each chapter to orient
    readers and preview what they will learn. *"Let's chart the course!"*

!!! mascot-thinking "Key Insight"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    This is the **thinking** style — used to highlight a key concept or insight
    that deserves extra attention. Use 2–3 times per chapter at most.

!!! mascot-tip "Sage's Tip"
    ![Sage giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    This is the **tip** style — used for helpful hints, shortcuts, or practical
    advice that makes the content more actionable for strategists.

!!! mascot-warning "Watch Out!"
    ![Sage warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    This is the **warning** style — used to flag common mistakes, implementation
    pitfalls, or decisions that organizations frequently get wrong.

!!! mascot-encourage "You Can Do This!"
    ![Sage encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    This is the **encourage** style — used when the material is complex or
    challenging to reassure readers that the effort is worthwhile.

!!! mascot-celebration "Great Progress!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    This is the **celebration** style — used at the end of major sections or
    chapters to mark progress and reinforce a sense of accomplishment.

---

## Image Border Debug View

The section below adds a red border around each mascot image so you can check
for excess transparent padding. If there is too much space between the border
and the visible character, run the trim script:

```bash
python scripts/trim-padding-from-image.py docs/img/mascot/FILENAME.png
```

<style>
.mascot-debug-img {
  float: left;
  width: 90px;
  height: 90px;
  margin: 0 .5em 0 0;
  object-fit: contain;
  border: 2px solid red;
}
</style>

| Pose | Preview |
|------|---------|
| neutral | ![neutral](../../img/mascot/neutral.png){ class="mascot-debug-img" } |
| welcome | ![welcome](../../img/mascot/welcome.png){ class="mascot-debug-img" } |
| thinking | ![thinking](../../img/mascot/thinking.png){ class="mascot-debug-img" } |
| tip | ![tip](../../img/mascot/tip.png){ class="mascot-debug-img" } |
| warning | ![warning](../../img/mascot/warning.png){ class="mascot-debug-img" } |
| encouraging | ![encouraging](../../img/mascot/encouraging.png){ class="mascot-debug-img" } |
| celebration | ![celebration](../../img/mascot/celebration.png){ class="mascot-debug-img" } |
