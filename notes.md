https://docs.nativescript.org/core-concepts/ios-runtime/types/ObjC-Classes

> When Objective-C methods are exposed in JavaScript, we remove the colons from their names (selector), and then upper-case the letters following the removed colons.

```objc
@interface UIAlertView : UIView
- (void)dismissWithClickedButtonIndex:(NSInteger)buttonIndex animated:(BOOL)animated;
@end
```

```js
var instance = UIAlertView.alloc().init();
instance.dismissWithClickedButtonIndexAnimated(0, true);
```

---

https://stackoverflow.com/questions/24488159/cant-get-selector-to-work-for-my-swift-function

```swift
func authentication(viewController: GTMOAuth2ViewControllerTouch,
                  finishedWithAuth: GTMOAuth2Authentication,
                             error: NSError)
```

```objc
-(void)authentication:(GTMOAuth2ViewControllerTouch *) viewController 
     finishedWithAuth:(GTMOAuth2Authentication *) finishedWithAuth
                error:(NSError *)error
```

```js
instance.authenticationFinishedWithAuthError(0, true);
```

---

```swift
@objc open func highlight(_ code: String, as languageName: String? = nil, fastRender: Bool = true) -> NSAttributedString?
```

From `Highlightr-Swift.h` in the "Counterparts" menu for `Highlightr.swift`:

```objc
- (NSAttributedString * _Nullable)highlight:(NSString * _Nonnull)code as:(NSString * _Nullable)languageName fastRender:(BOOL)fastRender SWIFT_WARN_UNUSED_RESULT;
```

```js
instance.highlightAsFastRender();
```