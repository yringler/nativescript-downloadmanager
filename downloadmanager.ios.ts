/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />

import { DownloadOptions } from "./downloadmanager";
import { knownFolders, path } from 'tns-core-modules/file-system/file-system';

function toUrlPath(value: string): string {
	return value.replace(/\\/g, "/");
}

export class DownloadManager {
	download(url: string, options: DownloadOptions, callBack: Function) {
		NSURLSession.sharedSession.downloadTaskWithURLCompletionHandler(new NSURL({ string: url }), (tmpOut, _, error) => {

			const outUrl = `file://${toUrlPath(knownFolders.documents().path)}/${toUrlPath(options.directory)}/${options.filename}`;

			if (error != null) {
				callBack(false, null);
			} else if (tmpOut != null) {
				NSFileManager.defaultManager.moveItemAtURLToURLError(tmpOut, new NSURL({fileURLWithPath: outUrl}));
				callBack(true, outUrl);
			} else {
				callBack(false, null);
			}
		});
	}
}