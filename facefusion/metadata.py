from typing import Optional

METADATA =\
{
	'name': 'AetherSwap',
	'description': 'AetherSwap — Next-Generation Local AI Creative Studio',
	'version': '3.9.0',
	'license': 'OpenRAIL-AS',
	'author': 'AetherSwap Studio',
	'url': 'https://aetherswap.ai'
}


def get(key : str) -> Optional[str]:
	return METADATA.get(key)
